export interface PresetProduct {
  id: string;
  category: string;
  badge: string;
  name: string;
  url: string;
  currentPrice: string;
  currentSales: string;
  tagline: string;
}

export const PRESET_PRODUCTS: PresetProduct[] = [
  {
    id: 'fashion-muslim',
    category: 'Fashion Muslim',
    badge: 'Trending',
    name: 'Pashmina Ceruty Babydoll Premium Hijab Segi Empat Polos Jahit Tepi Lembut Tidak Menerawang',
    url: 'https://shopee.co.id/Pashmina-Ceruty-Babydoll-Premium-Hijab-Segi-Empat-Polos-Jahit-Tepi-i.182736192.8392019382',
    currentPrice: 'Rp 28.500',
    currentSales: '12 terjual / bulan (Trafik Tertahan)',
    tagline: 'Hijab Pashmina - Niche super ramai persaingan tinggi',
  },
  {
    id: 'skincare',
    category: 'Perawatan & Kecantikan',
    badge: 'High Profit',
    name: 'Serum Pencerah Wajah Niacinamide 10% Samarkan Bekas Jerawat Flek Hitam Kulit Glowing BPOM',
    url: 'https://shopee.co.id/Serum-Pencerah-Wajah-Niacinamide-10-Samarkan-Bekas-Jerawat-Flek-Hitam-i.91827364.573920184',
    currentPrice: 'Rp 79.000',
    currentSales: '45 terjual / bulan (Tingkat Konversi Rendah)',
    tagline: 'Serum Wajah - Kunci social proof & BPOM badge',
  },
  {
    id: 'gadget',
    category: 'Elektronik & Gadget',
    badge: 'Volume Tinggi',
    name: 'TWS Bluetooth 5.3 Earphone Wireless Bass Headset Gaming Low Latency Mic HD Tahan Air Sport',
    url: 'https://shopee.co.id/TWS-Bluetooth-5.3-Earphone-Wireless-Bass-Headset-Gaming-Low-Latency-i.38472918.992837461',
    currentPrice: 'Rp 89.900',
    currentSales: '80 terjual / bulan (Banyak Ulasan Bintang 3)',
    tagline: 'TWS Earphone - Persaingan harga ketat & Shopee Video',
  },
  {
    id: 'home-living',
    category: 'Perlengkapan Rumah',
    badge: 'Evergreen',
    name: 'Botol Minum Termos Stainless Steel 500ml Tahan Panas Dingin 24 Jam Anti Bocor BPA Free',
    url: 'https://shopee.co.id/Botol-Minum-Termos-Stainless-Steel-500ml-Tahan-Panas-Dingin-24-Jam-i.29384716.482910482',
    currentPrice: 'Rp 45.000',
    currentSales: '24 terjual / bulan (Kurang Voucher & Bundle)',
    tagline: 'Termos Stainless - Potensial bundling & souvenir',
  },
  {
    id: 'fashion-pria',
    category: 'Fashion Pria',
    badge: 'Streetwear',
    name: 'Kaos Polos Pria Oversize Cotton Combed 24s Tebal Adem Nyaman Dipakai Sehari-hari',
    url: 'https://shopee.co.id/Kaos-Polos-Pria-Oversize-Cotton-Combed-24s-Tebal-Adem-i.47291038.192847291',
    currentPrice: 'Rp 55.000',
    currentSales: '30 terjual / bulan (Judul Terlalu Pendek)',
    tagline: 'Kaos Oversize - Kunci di size chart visual & warna',
  },
];
