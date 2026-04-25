// ─── User & Auth ─────────────────────────────────────────────────────────────

export type SubscriptionStatus = 'free' | 'active';

export interface Profile {
  id: string;
  is_anonymous: boolean;
  subscription_status: SubscriptionStatus;
  entitlement: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  role: string;
}

// ─── Posts ───────────────────────────────────────────────────────────────────

export type PostVisibility = 'free' | 'exclusive';

export interface Post {
  id: string;
  title: string;
  body: string;
  media_url: string | null;
  visibility: PostVisibility;
  published: boolean;
  created_at: string;
}

// ─── Topics & Voting ─────────────────────────────────────────────────────────

export type TopicStatus = 'active' | 'closed';

export interface Topic {
  id: string;
  title: string;
  description: string | null;
  status: TopicStatus;
  created_at: string;
  vote_count?: number;
}

export interface Vote {
  id: string;
  user_id: string;
  topic_id: string;
  created_at: string;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export type VoteErrorCode =
  | 'VOTE_LIMIT_REACHED'
  | 'TOPIC_CLOSED'
  | 'UNAUTHORIZED'
  | 'TOPIC_NOT_FOUND'
  | 'VOTE_FAILED'
  | 'SERVER_ERROR';

export interface VoteResponse {
  success: boolean;
  error?: VoteErrorCode;
  next_eligible_at?: string;
}

// ─── Database generic type (used with Supabase createClient<Database>) ───────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at'>;
        Update: Partial<Omit<Post, 'id' | 'created_at'>>;
      };
      topics: {
        Row: Omit<Topic, 'vote_count'>;
        Insert: Omit<Topic, 'id' | 'created_at' | 'vote_count'>;
        Update: Partial<Omit<Topic, 'id' | 'created_at' | 'vote_count'>>;
      };
      votes: {
        Row: Vote;
        Insert: Omit<Vote, 'id' | 'created_at'>;
        Update: never;
      };
      admin_users: {
        Row: AdminUser;
        Insert: AdminUser;
        Update: Partial<AdminUser>;
      };
    };
  };
}
