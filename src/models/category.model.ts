import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  id: CreationOptional<number>,
  cat_id: number,
  cat_name_bn: string,
  cat_name_en: string,
  no_of_subcat: number,
  no_of_dua: number,
  cat_icon: string,
}

export function getCategory(sequelize: Sequelize) {
  return sequelize.define<CategoryModel>('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cat_id: DataTypes.INTEGER,
    cat_name_bn: DataTypes.TEXT,
    cat_name_en: DataTypes.TEXT,
    no_of_subcat: DataTypes.INTEGER,
    no_of_dua: DataTypes.INTEGER,
    cat_icon: DataTypes.TEXT,
  }, { timestamps: false });
}
