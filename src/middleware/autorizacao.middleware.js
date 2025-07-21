const Assinatura = require("../modulos/assinatura/models/assinatura.model");

class AutorizacaoMiddleware {
  // Apenas para administradores
  static somenteAdmin(req, res, next) {
    if (req.usuario.papel !== "admin") {
      return res.status(403).json({ msg: "Acesso permitido apenas para administradores." });
    }
    next();
  }

  // Apenas para funcionários ou administradores
  static funcionarioOuAdmin(req, res, next) {
    const { papel } = req.usuario;
    if (papel !== "funcionario" && papel !== "admin") {
      return res.status(403).json({ msg: "Acesso permitido apenas para funcionários ou administradores." });
    }
    next();
  }

  // Apenas para o próprio usuário
  static apenasProprioUsuario(req, res, next) {
    const idDoToken = req.usuario.id;
    const idNaRota = req.params.id;

    if (idDoToken !== idNaRota) {
      return res.status(403).json({ msg: "Você só pode acessar seus próprios dados." });
    }
    next();
  }

  // Dono da assinatura (baseado em req.usuario.id === assinatura.assinanteId)
  static async apenasDonoDaAssinatura(req, res, next) {
    const { id } = req.params;

    try {
      const assinatura = await Assinatura.findByPk(id);
      if (!assinatura) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      if (assinatura.assinanteId !== req.usuario.id && req.usuario.papel !== "admin") {
        return res.status(403).json({ msg: "Acesso negado. Você não é o dono desta assinatura." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao verificar autorização." });
    }
  }
}

module.exports = AutorizacaoMiddleware;
