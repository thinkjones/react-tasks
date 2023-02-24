import { DataSource } from "typeorm"
import { Task } from "@/entity/task"

export class AppDataSource {
  public static instance: DataSource;

  private constructor() { }

  public static async getInstance(): Promise<DataSource> {
    console.log(`Database setup starting...\nurl=${process.env.DB_HOST_URI}`)
    if (!AppDataSource.instance) {
      AppDataSource.instance = new DataSource({
        type: "postgres",
        url: process.env.DB_HOST_URI,
        entities: [Task],
        synchronize: true,
        logging: false,
      })
      let ds: DataSource;
      try {
        ds = await AppDataSource.instance.initialize()
      } catch (error) {
        console.log(`*** DB ERROR\n${error}\n***`)
      } finally {
        if (ds!) {
          AppDataSource.instance = ds;
          console.log(`Database setup successfully`)
        } else {
          console.log(`Database setup error`)
        }
      }
    }
    return AppDataSource.instance;
  }
}
