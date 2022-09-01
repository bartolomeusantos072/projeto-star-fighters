import axios from "axios";
import * as participant from "../repositories/participant";

export async function find() {
  return participant.find();
}

export async function battle(firstUser: string, secondUser: string) {
  const firstUserRepos = await getParticipantRepos(firstUser);
  const secondUserRepos = await getParticipantRepos(secondUser);

  const firstParticipant = await getParticipant(firstUser);
  const secondParticipant = await getParticipant(secondUser);

  const firstUserStarCount = getParticipantStarCount(firstUserRepos);
  const secondUserStarCount = getParticipantStarCount(secondUserRepos);

  return getBattleResult(
    firstParticipant,
    secondParticipant,
    firstUserStarCount,
    secondUserStarCount
  );
}

async function getParticipantRepos(username: string) {
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
  return data;
}

async function getParticipant(username: string) {

  const fighter = await participant.findUsername(username);

  if (!fighter) {
    const createdParticipant = await participant.insert(username);
    return { id: createdParticipant.id, username, wins: 0, losses: 0, draws: 0 };
  }

  return fighter;
}

function getParticipantStarCount(participantRepos: any[]) {
  const repoStars = participantRepos.map((repo) => repo.stargazers_count);
  if (repoStars.length === 0) return 0;

  return repoStars.reduce((current: number, sum: number) => sum + current);
}

async function getBattleResult(firstParticipant: any, secondParticipant: any, firstUserStarCount: number, secondUserStarCount: number) {
  if (firstUserStarCount > secondUserStarCount) {
    await updateWinnerAndLoserStats(firstParticipant.id, secondParticipant.id);

    return {
      winner: firstParticipant.username,
      loser: secondParticipant.username,
      draw: false,
    };
  }

  if (secondUserStarCount < firstUserStarCount) {
    await updateWinnerAndLoserStats(secondParticipant.id, firstParticipant.id);
    return {
      winner: secondParticipant.username,
      loser: firstParticipant.username,
      draw: false,
    };
  }

  await updateDrawStats(firstParticipant.id, secondParticipant.id);
  return { winner: null, loser: null, draw: true };
}

async function updateWinnerAndLoserStats(winnerId: number, loserId: number) {
  await participant.update(winnerId, "wins");
  await participant.update(loserId, "losses");
}

async function updateDrawStats(firstParticipantId: number, secondParticipantId: number) {
  await participant.update(firstParticipantId, "draws");
  await participant.update(secondParticipantId, "draws");
}
