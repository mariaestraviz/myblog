
// Definicion del modelo Favourite:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favourite', {
        userId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: "El campo userId no puede estar vacío" }
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: "El campo postId no puede estar vacío" }
            }
        },
	      best: {
	          type: DataTypes.INTEGER,
	          validate: {
              notEmpty: {msg: "El campo best no puede estar vacio"},
              max: {args: 5,
                    msg: "El campo best debe de ser menor o igual que 5"},
              min: {args:1,
                    msg: "El campo best debe der mayor o igual que 1"}
            }
        }
      });
}

