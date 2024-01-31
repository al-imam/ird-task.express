import { getCategory, getDua, getSubCategory } from '$models';
import { join } from 'path';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(process.cwd(), 'dua_main.sqlite'),
});

sequelize.authenticate();

const Category = getCategory(sequelize);
const SubCategory = getSubCategory(sequelize);
const Dua = getDua(sequelize);

Category.hasMany(SubCategory, { foreignKey: 'cat_id' });
SubCategory.belongsTo(Category, { foreignKey: 'cat_id' });

SubCategory.hasMany(Dua, { foreignKey: 'subcat_id' });
Dua.belongsTo(SubCategory, { foreignKey: 'subcat_id' });

export const db = {
  sequelize,
  Category,
  SubCategory,
  Dua,
} as const;
