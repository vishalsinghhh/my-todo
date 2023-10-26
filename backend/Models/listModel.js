module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("List", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        }
    }, {
        timestamps: true
    });

    List.associate = models => {
        List.hasMany(models.Task, {
            foreignKey: 'listId',
            onDelete: 'CASCADE'
        });
        
        List.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return List;
};
