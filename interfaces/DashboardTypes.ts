import UserType from "./UserType"

type status = 'accepted' | 'rejected' | 'pending'

export type UserInfo = {
    id: string
    name: string
    username: string
    email: string
}

export type ConferenceInfo = {
    id: string
    title: string
    startDate: string
    endDate: string
    location: string
}

export type PaperInfo = {
    id: string
    title: string
    conferenceTitle: string
    authors: string[]
    keywords: string[]
    abstract: string,
}

export interface UserConferenceInfo extends ConferenceInfo {
    attendanceId: string
    status: status
}

export interface UserPaperInfo extends PaperInfo {
    status: status
}

export interface OrganizerConferenceInfo extends ConferenceInfo {
    acceptedUsersNumber: number
    rejectedUsersNumber: number
    pendingUsersNumber: number
    status: status
}

export interface OrganizerPaperInfo extends PaperInfo {
    status: status
}

export interface OrganizerAttendeesInfo extends UserInfo {
    conferenceTitle: string
    status: status
}

export interface OrganizerJudgesInfo extends UserInfo {
    conferenceTitle: string
}

export interface JudgePapersInfo extends PaperInfo {
    status: status
}

export interface AdminConferencesInfo extends ConferenceInfo {
    organizer: string
    status: status
}

export interface AdminPapersInfo extends PaperInfo {
    status: status
}

export interface AdminUsersInfo extends UserInfo {
    userType: UserType
}