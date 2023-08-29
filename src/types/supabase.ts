export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
declare global {
  interface Database {
    public: {
      Tables: {
        comment_likes: {
          Row: {
            commentId: string | null;
            created_at: string;
            id: string;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            commentId?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            commentId?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'comment_likes_commentId_fkey';
              columns: ['commentId'];
              referencedRelation: 'detail_comments';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'comment_likes_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'comment_likes_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        comments: {
          Row: {
            comment: string | null;
            created_at: string;
            iddfdfd: number;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            comment?: string | null;
            created_at?: string;
            iddfdfd?: number;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            comment?: string | null;
            created_at?: string;
            iddfdfd?: number;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'comments_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'comments_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        detail_comments: {
          Row: {
            comment: string | null;
            created_at: string;
            id: string;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            comment?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            comment?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'detail_comments_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'detail_comments_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        post_bookmark: {
          Row: {
            created_at: string;
            id: string;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'post_bookmark_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'post_bookmark_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        post_likes: {
          Row: {
            created_at: string | null;
            id: string;
            postId: string;
            userId: string | null;
          };
          Insert: {
            created_at?: string | null;
            id?: string;
            postId: string;
            userId?: string | null;
          };
          Update: {
            created_at?: string | null;
            id?: string;
            postId?: string;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'post_likes_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'post_likes_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        posts: {
          Row: {
            body: string | null;
            bookmark: string | null;
            created_at: string;
            id: string;
            img: string | null;
            likes: string | null;
            orgPostID: string | null;
            postCategory: string | null;
            products: Json | null;
            tagimage: Json | null;
            tags: Json | null;
            title: string | null;
            userId: string | null;
          };
          Insert: {
            body?: string | null;
            bookmark?: string | null;
            created_at?: string;
            id?: string;
            img?: string | null;
            likes?: string | null;
            orgPostID?: string | null;
            postCategory?: string | null;
            products?: Json | null;
            tagimage?: Json | null;
            tags?: Json | null;
            title?: string | null;
            userId?: string | null;
          };
          Update: {
            body?: string | null;
            bookmark?: string | null;
            created_at?: string;
            id?: string;
            img?: string | null;
            likes?: string | null;
            orgPostID?: string | null;
            postCategory?: string | null;
            products?: Json | null;
            tagimage?: Json | null;
            tags?: Json | null;
            title?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'posts_orgPostID_fkey';
              columns: ['orgPostID'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'posts_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        products: {
          Row: {
            created_at: string;
            event: Json | null;
            id: string;
            new: boolean | null;
            price: string | null;
            prodBrand: string | null;
            prodCategory: string | null;
            prodImg: string | null;
            prodName: string | null;
          };
          Insert: {
            created_at?: string;
            event?: Json | null;
            id?: string;
            new?: boolean | null;
            price?: string | null;
            prodBrand?: string | null;
            prodCategory?: string | null;
            prodImg?: string | null;
            prodName?: string | null;
          };
          Update: {
            created_at?: string;
            event?: Json | null;
            id?: string;
            new?: boolean | null;
            price?: string | null;
            prodBrand?: string | null;
            prodCategory?: string | null;
            prodImg?: string | null;
            prodName?: string | null;
          };
          Relationships: [];
        };
        replay_comment_likes: {
          Row: {
            commentId: string | null;
            created_at: string;
            id: string;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            commentId?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            commentId?: string | null;
            created_at?: string;
            id?: string;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'replay_comment_likes_commentId_fkey';
              columns: ['commentId'];
              referencedRelation: 'replay_comments';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'replay_comment_likes_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'replay_comment_likes_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        replay_comments: {
          Row: {
            comment: string | null;
            created_at: string;
            id: string;
            parent_commentId: string | null;
            postId: string | null;
            userId: string | null;
          };
          Insert: {
            comment?: string | null;
            created_at?: string;
            id?: string;
            parent_commentId?: string | null;
            postId?: string | null;
            userId?: string | null;
          };
          Update: {
            comment?: string | null;
            created_at?: string;
            id?: string;
            parent_commentId?: string | null;
            postId?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'replay_comments_parent_commentId_fkey';
              columns: ['parent_commentId'];
              referencedRelation: 'detail_comments';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'replay_comments_postId_fkey';
              columns: ['postId'];
              referencedRelation: 'posts';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'replay_comments_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        reports: {
          Row: {
            created_at: string;
            detailReport: Json | null;
            email: string | null;
            id: string;
            inquiry1: string | null;
            inquiry2: string | null;
            userId: string | null;
          };
          Insert: {
            created_at?: string;
            detailReport?: Json | null;
            email?: string | null;
            id?: string;
            inquiry1?: string | null;
            inquiry2?: string | null;
            userId?: string | null;
          };
          Update: {
            created_at?: string;
            detailReport?: Json | null;
            email?: string | null;
            id?: string;
            inquiry1?: string | null;
            inquiry2?: string | null;
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'reports_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        users: {
          Row: {
            created_at: string;
            email: string | null;
            id: string;
            nickname: string | null;
            profileImg: string | null;
          };
          Insert: {
            created_at?: string;
            email?: string | null;
            id?: string;
            nickname?: string | null;
            profileImg?: string | null;
          };
          Update: {
            created_at?: string;
            email?: string | null;
            id?: string;
            nickname?: string | null;
            profileImg?: string | null;
          };
          Relationships: [];
        };
      };
      Views: {
        userstest: {
          Row: {
            created_at: string | null;
            deleted_at: string | null;
            email: string | null;
            email_confirmed_at: string | null;
            id: string | null;
            is_sso_user: boolean | null;
            last_sign_in_at: string | null;
            phone: string | null;
            raw_app_meta_data: Json | null;
            role: string | null;
            updated_at: string | null;
          };
          Insert: {
            created_at?: string | null;
            deleted_at?: string | null;
            email?: string | null;
            email_confirmed_at?: string | null;
            id?: string | null;
            is_sso_user?: boolean | null;
            last_sign_in_at?: string | null;
            phone?: string | null;
            raw_app_meta_data?: Json | null;
            role?: string | null;
            updated_at?: string | null;
          };
          Update: {
            created_at?: string | null;
            deleted_at?: string | null;
            email?: string | null;
            email_confirmed_at?: string | null;
            id?: string | null;
            is_sso_user?: boolean | null;
            last_sign_in_at?: string | null;
            phone?: string | null;
            raw_app_meta_data?: Json | null;
            role?: string | null;
            updated_at?: string | null;
          };
          Relationships: [];
        };
      };
      Functions: {
        [_ in never]: never;
      };
      Enums: {
        [_ in never]: never;
      };
      CompositeTypes: {
        [_ in never]: never;
      };
    };
  }
}
