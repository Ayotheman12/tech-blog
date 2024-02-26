// id, content, date created, post id, user id
// Import statements
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

// Create new Model object
class Comment extends Model {}

// Initialize the Comment model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

module.exports = Comment;