const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment.js');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User);

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post);

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User);

module.exports = { User, Post, Comment };
