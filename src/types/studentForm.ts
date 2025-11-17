export type StudentFormType = {
    personalInfo: {
        firstName: string,
        lastName: string,
        fullName: string,
        email: string,
        phoneNumber?: string,
        dateOfBirth: string,
        gender: string,
        address: {
            permanent: {
                street: string,
                city: string,
                state: string,
                zipCode: string,
                country: string
            },
            current: {
                street: string,
                city: string,
                state: string,
                zipCode: string,
                country: string
            }
        },
        emergencyContact: {
            name: string,
            relationship: string,
            phone: string,
            email: string
        }
    }
}