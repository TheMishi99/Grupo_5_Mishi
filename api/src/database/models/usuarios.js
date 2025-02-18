module.exports = (sequelize, dataTypes) => {
  let alias = "Usuarios";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: dataTypes.BIGINT,
      allowNull: false,
    },
    province: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    authLevel: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };
  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = (models) => {
    Usuario.belongsToMany(models.Productos, {
      as: "productsCart",
      through: "CarritoProductos",
      foreignKey: "user_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };

  return Usuario;
};
