import { Sequelize } from 'sequelize';

const sequelizee = new Sequelize(
'postgresql://fikayo:Mdz7Q3yjzYhvDIuGBExrswOvuunpVmDe@dpg-cshm5kjtq21c73ei3f7g-a.oregon-postgres.render.com/bible_buddy',
 
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    logging: console.log,
  },
)



export default sequelizee