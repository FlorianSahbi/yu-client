import { gql } from "@apollo/client";

export const CORE_TRACK_FIELDS = gql`
  fragment CoreTrackFields on Track {
    _id
    title
    videoUrl
    videoId
    playCount
    lengthSeconds
    category
    ownerChannelName
    isAccepted
    thumbnail
    answers
    keywords
    createdAt
    updatedAt 
  }
`;

export const CORE_TAG_FIELDS = gql`
  fragment CoreTagFields on Tag {
    _id
    name
    playCount
    isCustom
    thumbnail
    createdAt
    updatedAt
  }
`;

export const CORE_DISCORD_DATA_FIELDS = gql`
  fragment CoreDiscordDataFields on DiscordUserPayload {
    id
    username
    avatar
    discriminator
    public_flags
    flags
    locale
    mfa_enabled
    email
    verified
  }
`;

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    _id
    username
    avatar
    email
    playCount
    createdAt
    updatedAt
    discordData {
      ...CoreDiscordDataFields
    }
  }
  ${CORE_DISCORD_DATA_FIELDS}
`;

export const CORE_GAME_FIELDS = gql`
  fragment CoreGameFields on Game {
    _id
    name
    goal
    trackTime
    createdAt
    updatedAt 
  }
`;

export const CORE_RANK_FIELDS = gql`
  fragment CoreRankFields on Rank {
    _id
    position
    user {
      ...CoreUserFields
    }
    points
    createdAt
    updatedAt
  }
  ${CORE_USER_FIELDS}
`;

export const CORE_ROUND_FIELDS = gql`
  fragment CoreRoundFields on Round {
    _id
    position
    track {
      ...CoreTrackFields
    }
    ranks {
      ...CoreRankFields
    }
    createdAt
    updatedAt
  }
  ${CORE_TRACK_FIELDS}
  ${CORE_RANK_FIELDS}
`;

export const CORE_LEADERBOARD_FIELDS = gql`
  fragment CoreLeaderboardFields on Leaderboard {
    points
  }
`;

export const CORE_YOUTUBE_DATA_FIELDS = gql`
  fragment CoreYouTubeDataFields on Tag {
    title
    keywords
    videoUrl
    lengthSeconds
    category
    ownerChannelName
    videoId 
  }
`;
