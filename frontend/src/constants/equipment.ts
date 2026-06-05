import { assetPath } from "../lib/assetPath";

export interface EquipmentAudienceBlock {
  title: string;
  text: string;
}

export interface EquipmentItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  highlights: string[];
  accent: "cyan" | "orange" | "mint";
  /** contain = 写真全体を表示（縦長・見切れ防止） */
  imageFit?: "contain" | "cover";
  /** 初心者／パフォーマンス向けの効果・目的（わかりやすく2枠表示） */
  audienceBlocks?: EquipmentAudienceBlock[];
}

export const EQUIPMENT_AUDIENCE_TAGS = [
  "運動初心者",
  "パフォーマンス向上",
  "ダイエット",
  "サーフィン",
  "ボディメイク",
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: "hex-bar",
    title: "ヘックスバー",
    subtitle: "腰への負担を抑えた、初心者にも扱いやすいデッドリフト",
    image: assetPath("images/equipment-hex-bar.png"),
    imageAlt: "赤いオープンフレームのヘックスバー",
    imageFit: "contain",
    paragraphs: [
      "通常のバーベルより姿勢を取りやすく、腰へのストレスを抑えながら全身を効率よく鍛えられます。",
      "デッドリフトやスクワット系の種目を、フォームを整えながら安全に習得したい方に最適です。運動初心者の方でも、トレーナーと一緒なら無理なくステップアップできます。",
    ],
    highlights: ["全身の筋力アップ", "フォーム習得", "初心者OK"],
    accent: "orange",
  },
  {
    id: "dumbbells",
    title: "可変式ダンベル",
    subtitle: "スペースを活かし、負荷を細かく調整できる",
    image: assetPath("images/equipment-dumbbells.png"),
    imageAlt: "Lysin 可変式ダンベルのセット",
    imageFit: "contain",
    paragraphs: [
      "重量をワンタッチで変更できるため、同じスペースで幅広い負荷設定が可能。筋力レベルや種目に合わせて、無駄なくトレーニングできます。",
      "ダイエット中の筋トレや、ボディメイクで「少しずつ負荷を上げたい」という方にも向いています。",
    ],
    highlights: ["負荷調整が自在", "ダイエット", "ボディメイク"],
    accent: "cyan",
  },
  {
    id: "water-bag",
    title: "ウォーターバッグ",
    subtitle: "中の水が動く「不安定な負荷」で体幹を自然に鍛える",
    image: assetPath("images/equipment-water-bag.png"),
    imageAlt: "GORILLA BOB ウォーターバッグ",
    imageFit: "contain",
    paragraphs: [
      "袋の中の水が揺れることで、ダンベルのように力が一直線に伝わらないトレーニングができます。姿勢を保とうとする本能的な反応が働き、腹筋・背筋などの体幹まわりを効率よく刺激します。",
    ],
    audienceBlocks: [
      {
        title: "運動初心者の方へ",
        text: "入れる水量で重さを調整できるため、自分のレベルから無理なくスタート可能。動きが単調になりにくく、「体幹を意識する」感覚を楽しみながら身につけられます。",
      },
      {
        title: "パフォーマンスを高めたい方へ",
        text: "サーフィンや球技など、動きの中でバランスが変わるスポーツに近い負荷。反応して体幹を固める力・ブレない軸の強さが、実戦のパフォーマンス向上につながります。",
      },
    ],
    highlights: ["体幹強化", "バランス", "調整しやすい"],
    accent: "mint",
  },
  {
    id: "burn-machine",
    title: "バーンマシン",
    subtitle: "腕をくるくる回すだけで肩まわりと体幹を同時に刺激",
    image: assetPath("images/equipment-burn-machine.png"),
    imageAlt: "バーンマシン（回転式トレーニング器具）",
    imageFit: "contain",
    paragraphs: [
      "ハンドルがリング内をスムーズに回転する独自の器具。肩・腕の持久力に加え、体を固定して動かすことで体幹も同時に鍛えられます。",
    ],
    audienceBlocks: [
      {
        title: "運動初心者の方へ",
        text: "難しいフォームの種目が少なく、トレーナーが付き添えばすぐに始めやすいメニュー。肩こり解消や姿勢改善を意識しながら、楽しく続けられるトレーニングです。",
      },
      {
        title: "パフォーマンスを高めたい方へ",
        text: "肩関節まわりの持久力・回転動作の強化に直結。サーフィンのパドリングやスイング動作など、肩を使い続けるスポーツのパフォーマンスアップに効果的です。",
      },
    ],
    highlights: ["肩の持久力", "体幹固定", "回転動作"],
    accent: "cyan",
  },
  {
    id: "surf-balance",
    title: "サーフィン特化・バランス器具",
    subtitle: "板の上で必要な体幹とバランス力を、ジムで先取りトレーニング",
    image: assetPath("images/equipment-rack.png"),
    imageAlt: "バランスボードやトレーニング器具が揃ったラック",
    imageFit: "contain",
    paragraphs: [
      "サーフィンに必要なバランス感覚や体幹を、陸上で効率的に鍛えられる器具を豊富にご用意。",
      "サーフィン以外のスポーツでも、転倒予防や動きのキレ向上につながるため、パフォーマンスを高めたい方にもおすすめです。運動初心者の方でも、難易度を調整しながら取り組めます。",
    ],
    highlights: ["サーフィン", "体幹・バランス", "パフォーマンス向上"],
    accent: "mint",
  },
  {
    id: "theragun",
    title: "最高級マッサージガン",
    subtitle: "THERAGUN による本格ボディケア",
    image: assetPath("images/equipment-theragun.png"),
    imageAlt: "THERAGUN PRO マッサージガン",
    imageFit: "contain",
    paragraphs: [
      "トレーニング後のケアにも、TSPでは業界でも評価の高いパーカッションガン（マッサージガン）を使用。",
      "筋肉のこわばりをほぐし、回復をサポート。ハードな練習のあとも、次のセッションに備えやすい身体づくりをサポートします。",
    ],
    highlights: ["ボディケア", "リカバリー", "トレーニング後"],
    accent: "cyan",
  },
  {
    id: "punching",
    title: "サンドバッグ＆ボクシング",
    subtitle: "気持ちよい汗と、全身を使ったコンディショニング",
    image: assetPath("images/equipment-punching-bag.png"),
    imageAlt: "吊り下げ式のパンチングバッグ",
    imageFit: "contain",
    paragraphs: [
      "サンドバッグを使ったミット打ちやストライクで、心肺機能と全身の筋力を同時に刺激。ストレス発散にもつながる、気持ちいいトレーニングです。",
      "ボクシンググローブも完備。ダイエットで消費カロリーを上げたい方、運動習慣を楽しく続けたい方にも人気のメニューです。",
    ],
    highlights: ["全身運動", "ダイエット", "ストレス解消"],
    accent: "orange",
  },
];
