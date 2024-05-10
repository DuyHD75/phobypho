import { GiCableStayedBridge } from "react-icons/gi";
import { GiPagoda } from "react-icons/gi";
import { GiTowerFlag } from "react-icons/gi";
import { MdOutlineTravelExplore } from "react-icons/md";




const members = [
   {
      "name": "Ngoc Duong",
      "title": "Founder",
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2Fd47f2fb31098bec6e789.jpg?alt=media&token=700993a4-7f60-41a3-b86f-b2d62f982ace"
   },
   {
      "name": "Kim Ngan",
      "title": "Co-Founder",
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2F5df5935be773492d1062.jpg?alt=media&token=99773d0e-c474-4e77-8057-dbf295b480ce"
   },
   {
      "name": "Hong Phuc",
      "title": "Head of Marketing",
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2Fbfbdd1c59fed31b368fc.jpg?alt=media&token=69ed855d-4d17-43cb-9d28-fb2edd3b87a7"
   },
   {
      "name": "Dinh Quan",
      "title": "Head of Human Resources",
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2F4db3e7088e20207e7931.jpg?alt=media&token=ac328775-f708-4c49-8c45-769da95d167b"
   },
   {
      "name": "Bao An",
      "title": "Finance Manager",
      "image": "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/331968902_1361095038025317_4816663891989595398_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1yyxYuhdwRcQ7kNvgFd7pJi&_nc_ht=scontent.fdad3-6.fna&oh=00_AfCh1gKN2NXSCvw_lXriiRTyYAPZ7Q4KebddV8Oj6yOYFg&oe=663ED3BB"
   },
   {
      "name": "Duc Duy",
      "title": "IT Support",
      "image": "https://avatars.githubusercontent.com/u/2007468?s=70"
   }
];


const eventImages = [
   {
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2F0cb8b9873bac95f2ccbd.jpg?alt=media&token=4999d766-4881-41a3-bfe5-05bbbe6edfe0"
   },
   {
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2Fa854466cc4476a193356.jpg?alt=media&token=edb0f02e-3830-4cc0-a8e6-4ce60a8a5a85"
   },
   {
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2Fb0bc90f912d2bc8ce5c3.jpg?alt=media&token=dc2cbc89-f9bf-4846-bb96-8d0a4e4d59e4"
   },
   {
      "image": "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/avatars%2Fa0a2b59d37b699e8c0a7.jpg?alt=media&token=e9ba778c-e8a8-41f7-9a04-b1158a361535"
   },
];


const categories = [
   {
      "name": "All",
      "icon": <MdOutlineTravelExplore style={{ fontSize: '1.4rem', marginRight: '4px' }} />
   },
   {
      "name": "Huế",
      "icon": <GiPagoda style={{ fontSize: '1.4rem', marginRight: '4px' }} />
   },
   {
      "name": "Đà Nẵng",
      "icon": <GiCableStayedBridge style={{ fontSize: '1.4rem', marginRight: '4px' }} />
   },
   {
      "name": "Quảng Nam",
      "icon": <GiTowerFlag style={{ fontSize: '1.4rem', marginRight: '4px' }} />
   },
];


const phobyphoDeals = {
   deals: [
      {
         "id": 1,
         "title": "Đăng ký",
         "description": "Dễ dàng tham gia chương trình thưởng với tài khoản của bạn.",
         "offer": "Nhận 200 điểm khi đăng ký ngay hôm nay."
      },
      {
         "id": 2,
         "title": "Tích điểm",
         "description": "Nhận thưởng cho mọi đơn hàng và hoạt động tham gia.",
         "offer": "Có những ưu đãi đặc biệt khi tích điểm."
      },
      {
         "id": 3,
         "title": "Quy đổi & Thưởng",
         "description": "Dễ dàng quy đổi điểm lấy phiếu giảm giá.",
         "offer": "Thưởng thức những ưu đãi đặc biệt khi quy đổi điểm tích lũy."
      }
   ],
};

const upgradeAccountPolicy = {
   "title": "Nâng cấp tài khoản",
   "features": [
      {
         "id": 1,
         "title": "Tài khoản đồng",
         "description": "20 booking",
         "offer": "Giảm 1% hoa hồng chi trả cho PHOBYPHO trên mỗi booking",
         "timeReset": "Thời hạn duy trì 4 tháng",
         "icon": 'https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_upgrade_re_gano.svg?alt=media&token=351e467c-88a6-434b-8907-bf60ce6dedad', 
         "rule": "Photographer phải đạt được số booking quy định tối thiểu trong mỗi thứ hạng, trong thời gian duy trì để nâng cấp lên thứ hạng tiếp theo."
      },
      {
         "id": 2,
         "title": "Tài khoản Bạc",
         "description": "50 booking",
         "offer": "Giảm 3% hoa hồng chi trả cho PHOBYPHO trên mỗi booking",
         "timeReset": "Thời hạn duy trì 4 tháng",
         "icon": 'https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_fireworks_re_2xi7.svg?alt=media&token=884d6879-fe57-48fb-aa8e-f2f7cddd1c0c', 
         "rule": "Photographer phải đạt được số booking quy định tối thiểu trong mỗi thứ hạng, trong thời gian duy trì để nâng cấp lên thứ hạng tiếp theo."

      },
      {
         "id": 3,
         "title": "Tài khoản Vàng",
         "description": "100 booking",
         "offer": "Giảm 5% hoa hồng chi trả cho PHOBYPHO trên mỗi booking",
         "timeReset": "Thời hạn duy trì 4 tháng",
         "icon": 'https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_fashion_blogging_re_fhi5.svg?alt=media&token=d41b6445-b6b9-46b5-8bc5-c3b0b9733f0d', 
         "rule": "Photographer phải đạt được số booking quy định tối thiểu trong mỗi thứ hạng, trong thời gian duy trì để nâng cấp lên thứ hạng tiếp theo."

      },
      {
         "id": 4,
         "title": "Tài khoản Kim Cương",
         "description": "200 booking",
         "offer": "Giảm 7% hoa hồng chi trả cho PHOBYPHO trên mỗi booking",
         "timeReset": "Thời hạn duy trì 4 tháng",
         "icon": 'https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_happy_news_re_tsbd.svg?alt=media&token=68b704a9-2181-43d6-843c-908b60b01542', 
         "rule": "Photographer phải đạt được số booking quy định tối thiểu trong mỗi thứ hạng, trong thời gian duy trì để nâng cấp lên thứ hạng tiếp theo."

      }
   ]
}


export { eventImages, members, categories, phobyphoDeals, upgradeAccountPolicy };