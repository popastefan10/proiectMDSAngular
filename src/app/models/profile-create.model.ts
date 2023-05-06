import { Profile } from "./profile.model";

export interface ProfileCreate{
    metadata: Partial<Profile>,
    media: File,
}