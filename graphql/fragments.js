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

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    _id
    username
    avatar
    discordId
    playCount
    createdAt
    updatedAt
  }
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

export const CORE_ROUND_FIELDS = gql`
  fragment CoreRoundFields on Round {
    _id
    position
    createdAt
    updatedAt 
  }
`;

export const CORE_RANK_FIELDS = gql`
  fragment CoreRankFields on Rank {
    _id
    position
    points
    createdAt
    updatedAt 
  }
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
