import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface DuaModel extends Model<InferAttributes<DuaModel>, InferCreationAttributes<DuaModel>> {
  id: CreationOptional<number>,
  cat_id: number,
  subcat_id: number,
  dua_id: number,
  dua_name_bn: string,
  dua_name_en: string,
  top_bn: string,
  top_en: string,
  dua_arabic: string,
  dua_indopak: string,
  clean_arabic: string,
  transliteration_bn: string,
  transliteration_en: string,
  translation_bn: string,
  translation_en: string,
  bottom_bn: string,
  bottom_en: string,
  refference_bn: string,
  refference_en: string,
  audio: string,
}

export function getDua(sequelize: Sequelize) {
  return sequelize.define<DuaModel>('dua', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cat_id: DataTypes.INTEGER,
    subcat_id: DataTypes.INTEGER,
    dua_id: DataTypes.INTEGER,
    dua_name_bn: DataTypes.TEXT,
    dua_name_en: DataTypes.TEXT,
    top_bn: DataTypes.TEXT,
    top_en: DataTypes.TEXT,
    dua_arabic: DataTypes.TEXT,
    dua_indopak: DataTypes.TEXT,
    clean_arabic: DataTypes.TEXT,
    transliteration_bn: DataTypes.TEXT,
    transliteration_en: DataTypes.TEXT,
    translation_bn: DataTypes.TEXT,
    translation_en: DataTypes.TEXT,
    bottom_bn: DataTypes.TEXT,
    bottom_en: DataTypes.TEXT,
    refference_bn: DataTypes.TEXT,
    refference_en: DataTypes.TEXT,
    audio: DataTypes.TEXT,
  }, { timestamps: false, freezeTableName: true },
  );
}
