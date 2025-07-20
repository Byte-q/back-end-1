import mongoose, { Document, Model} from 'mongoose'

export const StatisticSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

export interface IStatistic {
    data: any,
    type: string,
};

type StatisticDocument = IStatistic & Document;
export const StatisticModel: Model<StatisticDocument> = mongoose.model<StatisticDocument>('statistic', StatisticSchema);
