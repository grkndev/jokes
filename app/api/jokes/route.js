import path from "path"; //Dizine erişmek için Path Api'sini import ettik
import { promises as fs } from "fs"; // Eriştiğimiz dizindeki dosyaları okuya bilmek için File-System(FS) Api'sini import ettik
export async function GET() { //Request'imize cevap vermek için bir GET fonksiyonu oluşturduk
  //NextJS otomatik olarak istek türlerine göre methodları render almakta

  const jsonDir = path.join(process.cwd(), "component"); //process.cwd() anadizin olmakta ve sonraki parametreler alt dizini işaret etmekte
  const fileContents = await fs.readFile(jsonDir + "/jokes.json", "utf8");//Json dosyasının bulunduğu dizinden aldık ve utf8 formatında okuduk
  return Response.json({ data: JSON.parse(fileContents) });//yeni bir Response oluşturduk ve Request'imize cevap verdik.
}

//eğer bir post isteği atılırsa bu method cevap verecektir
export async function POST() {
  Response.json({message:"Bu bir post isteğidir"})
}


/*
Şuanda bu yolun başındasın ama inanırsan yapamayacağın şey yok.
Şuanda JSON dosyası olduğu için optimizasyon sorunu olabilir veritabanlarını öğrendiğinde daha rahat olacaktır.
MongoDB tavsiyelerimden bir tanesi :)
*/