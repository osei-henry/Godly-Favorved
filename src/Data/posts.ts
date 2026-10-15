export const categories = ['partners', 'health', 'events', 'gallery'] as const

export type Category = (typeof categories)[number]

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'p'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'video'; src: string; caption?: string }

export type Post = {
  slug: string
  title: string
  date?: string // YYYY-MM-DD; omit when no publication date is provided
  category: Category
  excerpt: string
  cover?: string
  content: readonly Block[]
}

// These posts use the photos and video supplied in public/blog.
export const posts: readonly Post[] = [
  {
    slug: 'choosing-your-glasses',
    title: 'Finding frames that feel right',
    category: 'health',
    cover: '/blog/image.png',
    excerpt:
      'The right pair of glasses should help you see clearly and feel comfortable throughout the day.',
    content: [
      {
        type: 'p',
        text: 'When choosing frames, consider comfort, fit and the activities you do every day. An eye care professional can help you find a pair that suits your prescription and sits comfortably.',
      },
      {
        type: 'image',
        src: '/blog/image.png',
        caption: 'Choosing a pair of frames for everyday wear.',
      },
    ],
  },
  {
    slug: 'getting-the-right-fit',
    title: 'A comfortable fit makes a difference',
    category: 'health',
    cover: '/blog/image1.png',
    excerpt:
      'A proper fitting helps your glasses sit securely and keeps your lenses in the right position.',
    content: [
      {
        type: 'p',
        text: 'Glasses should feel secure without pinching or slipping. If your frames feel uncomfortable, ask an optician to check the fit and adjust them for you.',
      },
      {
        type: 'image',
        src: '/blog/image1.png',
        caption: 'An optician helping a patient try on glasses.',
      },
    ],
  },
  {
    slug: 'eye-care-video',
    title: 'A closer look at eye care',
    category: 'gallery',
    cover: '/blog/image1.png',
    excerpt: 'Watch the video for a closer look at eye care and eyewear.',
    content: [
      {
        type: 'video',
        src: '/blog/video.mp4',
        caption: 'Eye care video.',
      },
    ],
  },
]

export const sortedPosts: readonly Post[] = posts

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
