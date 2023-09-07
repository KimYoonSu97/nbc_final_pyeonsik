export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

  declare global {
    interface Database {
  public: {
    Tables: {
      badge: {
        Row: {
          "100Likes": boolean | null
          "24/7": boolean | null
          bookMark: boolean | null
          bug: boolean | null
          created_at: string
          early: boolean | null
          firstNewProductReivew: boolean | null
          firstRecipe: boolean | null
          kingStar: boolean | null
          newProductUploader: boolean | null
          ourEmployee: boolean | null
          recipeMania: boolean | null
          risingStar: boolean | null
          sheriff: boolean | null
          user_id: string
        }
        Insert: {
          "100Likes"?: boolean | null
          "24/7"?: boolean | null
          bookMark?: boolean | null
          bug?: boolean | null
          created_at?: string
          early?: boolean | null
          firstNewProductReivew?: boolean | null
          firstRecipe?: boolean | null
          kingStar?: boolean | null
          newProductUploader?: boolean | null
          ourEmployee?: boolean | null
          recipeMania?: boolean | null
          risingStar?: boolean | null
          sheriff?: boolean | null
          user_id: string
        }
        Update: {
          "100Likes"?: boolean | null
          "24/7"?: boolean | null
          bookMark?: boolean | null
          bug?: boolean | null
          created_at?: string
          early?: boolean | null
          firstNewProductReivew?: boolean | null
          firstRecipe?: boolean | null
          kingStar?: boolean | null
          newProductUploader?: boolean | null
          ourEmployee?: boolean | null
          recipeMania?: boolean | null
          risingStar?: boolean | null
          sheriff?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      comment_likes: {
        Row: {
          commentId: string | null
          created_at: string
          id: string
          postId: string | null
          userId: string | null
        }
        Insert: {
          commentId?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Update: {
          commentId?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_likes_commentId_fkey"
            columns: ["commentId"]
            referencedRelation: "detail_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_likes_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      detail_comments: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          postId: string | null
          userId: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detail_comments_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      post_bookmark: {
        Row: {
          created_at: string
          id: string
          postId: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_bookmark_postId_fkey"
            columns: ["postId"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          postId: string
          userId: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          postId: string
          userId?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          postId?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_postId_fkey"
            columns: ["postId"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          body: string | null
          created_at: string
          hasOrgPost: boolean | null
          id: string
          orgPostId: string | null
          postCategory: string | null
          recipeBody: Json | null
          tagimage: Json | null
          tags: Json | null
          title: string | null
          userId: string | null
          title_body: string | null
          title_body_recipebody: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          hasOrgPost?: boolean | null
          id?: string
          orgPostId?: string | null
          postCategory?: string | null
          recipeBody?: Json | null
          tagimage?: Json | null
          tags?: Json | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          hasOrgPost?: boolean | null
          id?: string
          orgPostId?: string | null
          postCategory?: string | null
          recipeBody?: Json | null
          tagimage?: Json | null
          tags?: Json | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_orgPostId_fkey"
            columns: ["orgPostId"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          created_at: string
          event: Json | null
          id: string
          new: boolean | null
          price: string | null
          prodBrand: string | null
          prodCategory: string | null
          prodImg: string | null
          prodName: string | null
        }
        Insert: {
          created_at?: string
          event?: Json | null
          id?: string
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Update: {
          created_at?: string
          event?: Json | null
          id?: string
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Relationships: []
      }
      replay_comment_likes: {
        Row: {
          "commentId ": string | null
          created_at: string
          id: string
          postId: string | null
          userId: string | null
        }
        Insert: {
          "commentId "?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Update: {
          "commentId "?: string | null
          created_at?: string
          id?: string
          postId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replay_comment_likes_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      replay_comments: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          parent_commentId: string | null
          postId: string | null
          userId: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          parent_commentId?: string | null
          postId?: string | null
          userId?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          parent_commentId?: string | null
          postId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replay_comments_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reports: {
        Row: {
          created_at: string
          detailReport: Json | null
          email: string | null
          id: string
          inquiry1: string | null
          inquiry2: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          detailReport?: Json | null
          email?: string | null
          id?: string
          inquiry1?: string | null
          inquiry2?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          detailReport?: Json | null
          email?: string | null
          id?: string
          inquiry1?: string | null
          inquiry2?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      swiper: {
        Row: {
          created_at: string
          id: string
          isGood: boolean | null
          prodId: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          isGood?: boolean | null
          prodId?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          isGood?: boolean | null
          prodId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swiper_prodId_fkey"
            columns: ["prodId"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swiper_prodId_fkey"
            columns: ["prodId"]
            referencedRelation: "random_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swiper_prodId_fkey"
            columns: ["prodId"]
            referencedRelation: "random_productss"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swiper_prodId_fkey"
            columns: ["prodId"]
            referencedRelation: "show_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swiper_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          level: string | null
          nickname: string | null
          profileImg: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          level?: string | null
          nickname?: string | null
          profileImg?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          level?: string | null
          nickname?: string | null
          profileImg?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      random_products: {
        Row: {
          created_at: string | null
          event: Json | null
          id: string | null
          new: boolean | null
          price: string | null
          prodBrand: string | null
          prodCategory: string | null
          prodImg: string | null
          prodName: string | null
        }
        Insert: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Update: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Relationships: []
      }
      random_productss: {
        Row: {
          created_at: string | null
          event: Json | null
          id: string | null
          new: boolean | null
          price: string | null
          prodBrand: string | null
          prodCategory: string | null
          prodImg: string | null
          prodName: string | null
        }
        Insert: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Update: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Relationships: []
      }
      show_products: {
        Row: {
          created_at: string | null
          event: Json | null
          id: string | null
          new: boolean | null
          price: string | null
          prodBrand: string | null
          prodCategory: string | null
          prodImg: string | null
          prodName: string | null
        }
        Insert: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Update: {
          created_at?: string | null
          event?: Json | null
          id?: string | null
          new?: boolean | null
          price?: string | null
          prodBrand?: string | null
          prodCategory?: string | null
          prodImg?: string | null
          prodName?: string | null
        }
        Relationships: []
      }
      userstest: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_confirmed_at: string | null
          id: string | null
          is_sso_user: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          raw_app_meta_data: Json | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_confirmed_at?: string | null
          id?: string | null
          is_sso_user?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          raw_app_meta_data?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_confirmed_at?: string | null
          id?: string | null
          is_sso_user?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          raw_app_meta_data?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      title_body: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      title_body_recipebody: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
  }
