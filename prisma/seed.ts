const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const food = await prisma.category.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', name: 'Хоол' },
  });

  const users = await prisma.user.createMany({
    data: [
      { id: 'u1', name: 'Бат', password: 'hashedpass1' },
      { id: 'u2', name: 'Сараа', password: 'hashedpass2' },
    ],
    skipDuplicates: true,
  });

const data = [
    {
      name: 'Modern Nomads',
      description: 'Монгол үндэсний хоолны сүлжээ ресторан',
      address: 'УБ, СБД, 1-р хороо',
      phone: '99112233',
      email: 'info@modernnomads.mn',
      website: 'https://modernnomads.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/modernnomads',
      instagramUrl: 'https://instagram.com/modernnomads',
      timetable: '10:00–22:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/nomads_logo.png',
      categoryId: food.id,
    },
    {
      name: 'BD’s Mongolian BBQ',
      description: 'Mongolian grill стильтэй ресторан',
      address: 'УБ, ХУД, Чингисийн өргөн чөлөө',
      phone: '99001122',
      email: 'info@bdsmongolia.mn',
      website: 'https://bdsmongolia.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/bdsmongolia',
      instagramUrl: 'https://instagram.com/bdsmongolia',
      timetable: '11:00–23:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/8c0058533b75d83074fb2d54b41789f8.jpg',
      categoryId: food.id,
    },
    {
      name: 'Khaan Deli',
      description: 'Барууны болон Монгол хоолны ресторан',
      address: 'УБ, БГД, 4-р хороо, Энхтайваны өргөн чөлөө',
      phone: '99115566',
      email: 'contact@khaandeli.mn',
      website: 'https://khaandeli.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/khaandeli',
      instagramUrl: 'https://instagram.com/khaandeli',
      timetable: '09:00–22:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/300786139_533820001877874_8270612961028424860_n.jpg',
      categoryId: food.id,
    },
    {
      name: 'Terelj Lodge',
      description: 'Жуулчны бааз, Монгол хоол, амралт зугаа',
      address: 'Тэрэлж, Газарчны хөндий',
      phone: '99554433',
      email: 'info@tereljlodge.mn',
      website: 'https://tereljlodge.mn',
      location: 'Тэрэлж',
      facebookUrl: 'https://facebook.com/tereljlodge',
      instagramUrl: 'https://instagram.com/tereljlodge',
      timetable: '09:00–21:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/afb4a3a399435f242d56d3744fce31352dd065d3.jpg',
      categoryId: food.id,
    },
    {
      name: 'Veranda Restaurant',
      description: 'Европ хоолны ресторан, үзэгдэх орчин сайтай',
      address: 'УБ, СБД, 1-р хороо, Central Tower',
      phone: '77337733',
      email: 'info@veranda.mn',
      website: 'https://veranda.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/verandamn',
      instagramUrl: 'https://instagram.com/verandamn',
      timetable: '10:00–23:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/327321189_845558033182105_8650319850063531882_n.jpg',
      categoryId: food.id,
    },
    {
      name: 'Korean House',
      description: 'Солонгос үндэсний хоолны газар',
      address: 'УБ, ХУД, 15-р хороо, Seoul Street',
      phone: '99229922',
      email: 'khouse@seoul.mn',
      website: 'https://koreanhouse.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/koreanhousemn',
      instagramUrl: 'https://instagram.com/koreanhousemn',
      timetable: '11:00–22:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/300369248_440434354769732_5644287063389513545_n.png',
      categoryId: food.id,
    },
    {
      name: 'Sakura Sushi',
      description: 'Япон хоолны сүлжээ ресторан',
      address: 'УБ, СБД, 6-р хороо, Peace Avenue',
      phone: '99334455',
      email: 'sakura@sushi.mn',
      website: 'https://sushisakura.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/sushisakura',
      instagramUrl: 'https://instagram.com/sushisakura',
      timetable: '10:00–22:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/400307983_308549241933516_1421583180728908731_n.jpg',
      categoryId: food.id,
    },
    {
      name: 'The Bull Hotpot',
      description: 'Хятад халуун тогооны ресторан',
      address: 'УБ, БЗД, Нарны зам',
      phone: '99776655',
      email: 'bull@hotpot.mn',
      website: 'https://bullhotpot.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/bullhotpot',
      instagramUrl: 'https://instagram.com/bullhotpot',
      timetable: '11:00–23:30',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/472728802_896588756022136_3658598468207927959_n.jpg',
      categoryId: food.id,
    },
    {
      name: 'Silk Road Tea House',
      description: 'Цайны газар, соёлын уур амьсгалтай кафе',
      address: 'УБ, СБД, 7-р хороо, State Department Store орчим',
      phone: '88118811',
      email: 'silkroad@tea.mn',
      website: 'https://silkroadtea.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/silkroadtea',
      instagramUrl: 'https://instagram.com/silkroadtea',
      timetable: '09:00–22:00',
      logoUrl: 'https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/5d413032625e7fdb4d1b1523_srs-logo-p-500.png',
      categoryId: food.id,
    },
  ];

  // Clear old data
  await prisma.review.deleteMany();
  await prisma.business.deleteMany();

  for (const b of data) {
    await prisma.business.create({
      data: { ...b, categoryId: food.id },
    });
  }

  console.log('✅ Seeded 3 businesses');

  // --- Reviews ---
  const allBusinesses = await prisma.business.findMany();

  const reviews = [
    {
      post: 'Хоол амттай, үйлчилгээ сайтай!',
      score: 5,
      userId: 'u1',
      businessId: allBusinesses[0].id,
    },
    {
      post: 'Орчин нь таалагдсан, гэхдээ пицца жаахан хатуу байсан.',
      score: 4,
      userId: 'u2',
      businessId: allBusinesses[0].id,
    },
    {
      post: 'Үйлчилгээ маш хурдан байлаа!',
      score: 5,
      userId: 'u2',
      businessId: allBusinesses[1].id,
    },
    {
      post: 'Маш гоё уур амьсгалтай газар.',
      score: 5,
      userId: 'u1',
      businessId: allBusinesses[2].id,
    },
  ];

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  console.log('✅ Added demo users + reviews');
}

main()
  .then(() => console.log('🎉 Database seeded successfully!'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());


  