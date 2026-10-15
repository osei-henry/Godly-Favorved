

export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
}

export type GalleryItem = {
  id: string
  caption: string
  src?: string
  tall?: boolean
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Patient name',
    role: 'Cataract surgery patient',
    quote:
      'Placeholder: write what the patient said about their care, the staff and how their vision improved.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Patient name',
    role: 'Glasses and eye exam',
    quote:
      'Placeholder: a short, honest comment about the visit, for example how friendly the team was.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Parent name',
    role: "Children's eye care",
    quote:
      'Placeholder: a parent describing how gently the doctors treated their child.',
    rating: 5,
  },
]

export const galleryItems: readonly GalleryItem[] = [
  {
    id: 'g1',
    caption: 'A portrait of an eye care professional',
    src: '/Gallery/download.jpeg',
    tall: true,
  },
  {
    id: 'g2',
    caption: 'Choosing a pair of eyeglasses',
    src: '/Gallery/image%20copy.png',
  },
  {
    id: 'g3',
    caption: 'An eye care professional at work',
    src: '/Gallery/image.png',
  },
  {
    id: 'g4',
    caption: 'Trying on a new pair of glasses',
    src: '/Gallery/image1%20copy.png',
  },
  {
    id: 'g5',
    caption: 'Optometrist portrait',
    src: '/Gallery/image1.png',
    tall: true,
  },
  {
    id: 'g6',
    caption: 'Eye care professional portrait',
    src: '/Gallery/image2.png',
  },
]
