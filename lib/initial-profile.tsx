import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        // Handle the case where the user is not authenticated
        return redirectToSignIn();
    }

    const existingProfile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (existingProfile) {
        return existingProfile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    // Manually include properties without spreading newProfile -> Due to an error in file app\(setup)\page.tsx
    // previous code -> return newProfile;
    return {
        id: newProfile.id,
        userId: newProfile.userId,
        name: newProfile.name,
        imageUrl: newProfile.imageUrl,
        email: newProfile.email,
        createdTime: newProfile.createdTime,
        updatedAt: newProfile.updatedAt
    };
};
