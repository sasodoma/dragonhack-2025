import { Contract, State, Action } from '@midnight-dev/sdk';

interface UserProgress {
    userId: string;
    challengeId: number;
    successRate: number;
    timestamp: number;
}

interface Challenge {
    challengeId: number;
    letters: string[];
    type: string;
}

interface BrailleCode {
    letter: string;
    braille: number[];
}

@Contract
class LearningContract {
    @State private userProgress: Map<string, UserProgress[]> = new Map();
    @State private challenges: Map<number, Challenge> = new Map();
    @State private brailleCodes: Map<string, BrailleCode> = new Map();

    @Action
    async submitAnswer(userId: string, letter: string, brailleInput: number[]): Promise<boolean> {
        const brailleCode = this.brailleCodes.get(letter.toLowerCase());
        if (!brailleCode) return false;
        
        const isCorrect = JSON.stringify(brailleCode.braille) === JSON.stringify(brailleInput);
        
        // Record progress privately
        const progress: UserProgress = {
            userId,
            challengeId: this.getCurrentChallengeId(userId),
            successRate: isCorrect ? 1 : 0,
            timestamp: Date.now()
        };
        
        this.recordProgress(userId, progress);
        return isCorrect;
    }

    @Action
    private recordProgress(userId: string, progress: UserProgress) {
        const userProgress = this.userProgress.get(userId) || [];
        userProgress.push(progress);
        this.userProgress.set(userId, userProgress);
    }

    @Action
    async getChallenge(challengeId: number): Promise<Challenge | null> {
        return this.challenges.get(challengeId) || null;
    }

    @Action
    async getAllChallenges(): Promise<Challenge[]> {
        return Array.from(this.challenges.values());
    }

    private getCurrentChallengeId(userId: string): number {
        // Implementation for getting current challenge
        return 1; // Placeholder
    }
}