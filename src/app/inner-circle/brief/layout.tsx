import type {Metadata} from 'next';
export const metadata:Metadata={
  title:'Venue Revenue Brief — The Inner Circle',
  description:'Short operating notes for independent venue owners on revenue per guest, underused space, media, food, beverage, commerce and venue optimization.',
  alternates:{canonical:'https://innercircle.thekollectivehospitality.com/brief'},
  openGraph:{title:'Venue Revenue Brief — The Inner Circle',description:'Operating notes for independent venue owners and hospitality operators.',url:'https://innercircle.thekollectivehospitality.com/brief',siteName:'The Inner Circle',type:'website'},
};
export default function Layout({children}:{children:React.ReactNode}){return children;}
