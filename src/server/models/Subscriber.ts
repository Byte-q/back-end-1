import mongoose, { Document, Model} from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false
    },
});

export interface ISubscriber {
    email: String,
    createdAt?: Date,
}

type SubscriberDocument = ISubscriber & Document;
export const SubscriberModel: Model<SubscriberDocument> = mongoose.model<SubscriberDocument>('subscribers', SubscriberSchema)
