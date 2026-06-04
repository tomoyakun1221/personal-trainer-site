def attach_image(record, attachment_name, filename)
  path = Rails.root.join("db/seeds/images", filename)
  return unless path.exist?

  record.public_send(attachment_name).attach(
    io: File.open(path),
    filename: filename,
    content_type: "image/png"
  )
end

AdminUser.find_or_create_by!(email: "admin@example.com") do |u|
  u.password = "password123"
end

SiteSetting.current.update!(
  trainer_name: "TSP",
  tagline: "一人ひとりに寄り添い、「続けられるボディメイク」をサポートします",
  hero_description: "カウンセリングと体験トレーニングで、ジムやトレーナーとの相性も確認できます。運動初心者の方も安心して始められます。",
  profile_title: "プロフィール",
  profile_body: "NSCA-CPT資格保有。フリーランスエンジニア兼パーソナルトレーナーとして活動。科学的根拠に基づいた指導と、続けやすい食事・トレーニングをご提案します。",
  qualifications: "NSCA-CPT（全米ストレングス＆コンディショニング協会認定パーソナルトレーナー）",
  specialties: "ダイエット・ボディメイク\n運動初心者サポート\nサーフィンパフォーマンス向上\n自宅トレーニング・ボディケア",
  line_url: nil,
  instagram_url: "https://www.instagram.com/tomoya_personal_trainer/",
  email: "tomoyakun.1221@gmail.com",
  phone: "090-5408-6445",
  location: nil
)

attach_image(SiteSetting.current, :profile_image, "trainer_profile.png")

PricingPlan.delete_all
[
  {
    name: "カウンセリング／体験トレーニング",
    price: 0,
    period: "回",
    plan_category: "trial",
    course_breakdown: nil,
    description: "※無料で実施致します！！",
    target_audience: nil,
    featured: true,
    position: 0,
    features: ""
  },
  {
    name: "50分コース",
    price: 4300,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "40分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥15,500",
    promotion:
      "《期間限定OPEN記念》当該コース限定！\n3回限定の2,100円／回でお試しいただけます！\nパーソナルトレーニング受けたいけど不安でどんなものなのか、まずは体験したい方におすすめのコースです！",
    target_audience: nil,
    featured: true,
    position: 1,
    features: ""
  },
  {
    name: "70分コース",
    price: 6400,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "60分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥24,000",
    promotion: nil,
    target_audience: "栄養補給したい方 一息休憩入れたい方におすすめのコースです。",
    includes_drink: true,
    featured: false,
    position: 2,
    features: ""
  },
  {
    name: "90分コース",
    price: 8400,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "80分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥32,000",
    promotion: nil,
    target_audience: "栄養補給したい方 一息休憩入れたい方におすすめのコースです。",
    includes_drink: true,
    featured: false,
    position: 3,
    features: ""
  }
].each { |attrs| PricingPlan.create!(attrs) }

Transformation.delete_all
female = Transformation.create!(
  title: "女性ゲストの変化",
  client_label: "女性ゲスト",
  before_weight: 85.4,
  after_weight: 78.6,
  result_summary: "2ヶ月で6.8kg減！",
  composite_display: true,
  position: 1
)
attach_image(female, :before_image, "transformation_female.png")

male = Transformation.create!(
  title: "男性ゲストの変化",
  client_label: "男性ゲスト",
  before_weight: 84.0,
  after_weight: 81.0,
  result_summary: "2ヶ月で3kg減！",
  composite_display: true,
  position: 2
)
attach_image(male, :before_image, "transformation_male.png")

Testimonial.delete_all
[
  {
    client_name: "お客様の声（男性ゲスト）",
    guest_type: "male",
    content: [
      "2ヶ月で3キロ！",
      "シェイプアップもできて良かったです！",
      "柔軟性アップや筋肉アップ、食事制限含めてありがたかったです！"
    ].join("\n"),
    rating: 5,
    position: 1
  },
  {
    client_name: "お客様の声（女性ゲスト）",
    guest_type: "female",
    content: [
      "今までなかなか体重が減らず諦めかけていましたが、トレーナーさんのサポートのおかげで数値も見た目も変化を実感することができました。",
      "特に、体重が停滞したり少し増えてしまったりした時でも決して焦らせることなく真摯に寄り添ってくださったことが心強かったです。",
      "毎日の食事報告でもポジティブな言葉をいただけたので、モチベーションを高く維持できました。",
      "週一のトレーニングでは家でも実践しやすいメニューを中心に教えてくださり、疑問にもいつも丁寧に答えていただけたのも良かったです。"
    ].join("\n"),
    rating: 5,
    position: 2
  }
].each { |attrs| Testimonial.create!(attrs) }

puts "Seed complete. Admin: admin@example.com / password123"
