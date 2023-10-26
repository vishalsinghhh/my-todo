module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true
    });

    Task.associate = models => {
        Task.belongsTo(models.List, {
            foreignKey: 'listId',
            onDelete: 'CASCADE'
        });
    };

    return Task;
};
