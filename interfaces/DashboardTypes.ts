type status = 'accepted' | 'rejected' | 'pending'

export type UserInfo = {
    name: string
    username: string
    email: string
}

export type ConferenceInfo = {
    title: string
    startDate: string
    endDate: string
    location: string
}

export type PaperInfo = {
    title: string
    conferenceTitle: string
    authors: string[]
    keywords: string[]
    abstract: string,
}

export interface UserConferenceInfo extends ConferenceInfo {
    status: status
}

export interface UserPaperInfo extends PaperInfo {
    status: status
}

export interface OrganizerConferenceInfo extends ConferenceInfo {
    acceptedUsersNumber: number
    rejectedUsersNumber: number
    pendingUsersNumber: number
}

export interface OrganizerPaperInfo extends PaperInfo {
    acceptedPapersNumber: number
    rejectedPapersNumber: number
    pendingPapersNumber: number
}

export interface OrganizerAttendeesInfo extends UserInfo {
    conferenceTitle: string
    status: status
}

export interface OrganizerJudgesInfo extends UserInfo {
    conferenceTitle: string
}
