type status = 'accepted' | 'rejected' | 'pending'

export type ConferenceInfo = {
    title: string
    startDate: string
    endDate: string
    location: string
    status: status
}

export type PaperInfo = {
    title: string
    conferenceTitle: string
    authors: string[]
    keywords: string[]
    abstract: string,
    status: status
}