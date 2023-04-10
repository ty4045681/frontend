export interface Conference {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    theme: string;
    focus: string;
    keynotesAndSpeakers: Record<string, string>;
    agenda: Record<string, string>;
    registrationInfo: string;
    accommodations: string[];
    startCallingDateForPapers: string;
    endCallingDateForPapers: string;
    startCallingDateForPresentations: string;
    endCallingDateForPresentations: string;
    guidelineForPaperSubmission: string;
    guidelineForPresentationSubmission: string;
    sponsors: string[];
    exhibitors: string[];
    phoneNumber: string;
}
