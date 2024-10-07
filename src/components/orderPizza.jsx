/* Siparis olusturma*/ 
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import LogoSVG  from "../../Assets/Iteration-1-assets/logo.svg";
import FormBanner from "../../Assets/Iteration-2-aseets/pictures/form-banner.png";
import Footer from "./Footer"

/* Urun bilgileri belirlendi */
const initialData = {
    isimSoyisim: "",
    boyut: "",
    hamur: "",
    malzemeler: [],
    siparisNotu: "",
    miktar: "",
  }
/* Hata mesajlari belirlendi */
const errorMessages = {
    malzemeler : "* En az 4, en çok 10 tane malzeme seçmelisiniz!",
    isimSoyisim: "* İsim en az 3 karakter içermelidir.",
    boyut: "* Lütfen bir boyut seçin.",
    hamur: "* Lütfen hamur kalınlığı seçin.",
  }
/* Malzelemeler belirlendi. name: arka planda, veritabanina gonderilirken kullanilan isim 
label: kullanicinin gordugu yani arayuzde kullanilan metin */
const malzemeler = [
    { name: "Pepperoni", label: "Pepperoni" },
    { name: "Tavuk Izgara", label: "Tavuk Izgara" },
    { name: "Mısır", label: "Mısır" },
    { name: "Sarımsak", label: "Sarımsak" },
    { name: "Ananas", label: "Ananas" },
    { name: "Sosis", label: "Sosis" },
    { name: "Soğan", label: "Soğan" },
    { name: "Sucuk", label: "Sucuk" },
    { name: "Biber", label: "Biber" },
    { name: "Kabak", label: "Kabak" },
    { name: "Kanada Jambonu", label: "Kanada Jambonu" },
    { name: "Domates", label: "Domates" },
    { name: "Jalepeno", label: "Jalepeno" },
];

export default function OrderPizza({ onSubmit }) {
    /* Kullanıcı etkileşimi ile değişecek veriler */
      const [form, setForm] = useState(initialData);
      const [errors, setErrors] = useState(initialData);
      const [isValid, setIsValid] = useState(false);
      const [count, setCount] = useState(1);
      const history = useHistory();

/* Form her guncellendiginde dogrulamak icin bir fonksiyon calismali. 
"validateForm()" fonksiyonu calisacak */
 useEffect(() => {
      validateForm();
    }, [form]);

/* formda yapilan degisiklikleri denetlemek icin bir fonksiyon belirlendi. 
Bu fonksiyonun tanimi yapildi. */

const validateForm = () => {

  /* Hata mesajlarını ayarla */
  let newErrors = {};
  // 1. "isim-soyisim kısmı dolu ve 3 karakterden büyük mü?"
  newErrors.isimSoyisim = !form.isimSoyisim || form.isimSoyisim.length < 3 ? errorMessages.isimSoyisim : "";
  // 2. "pizza boyutu seçilmiş mi?" 
  newErrors.boyut = !form.boyut ? errorMessages.boyut : "";
  // 3. "hamur kalınlığı seçilmiş mi?" 
  newErrors.hamur = !form.hamur ? errorMessages.hamur : "";
  // 4. "4-10 arasında ek malzeme seçilmiş mi?" 
  if(form.malzemeler.length < 4 || form.malzemeler.length > 10) {
    newErrors.malzemeler = errorMessages.malzemeler;
  } else {
    newErrors.malzemeler = "";
  }

  setErrors(newErrors);

  /* newErrors'un value değerleri boş mu diye bakıp butona basılabilir mi belirleyen kısım*/
  const isValidForm = Object.values(newErrors).every((e) => e === "");
  setIsValid(isValidForm);
};

/* formu guncelleyen fonksiyon */
const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    
    if (type === "checkbox") {
      let newMalzemeler = [...form.malzemeler];
      if(checked) {
        newMalzemeler.push(name);
      } else {
        newMalzemeler = newMalzemeler.filter((item) => item !== name);
      }
      setForm({...form, malzemeler: newMalzemeler});
    } else {
      setForm({ ...form, [name]: value });
    }
  };

/* pizza sayisi => counter */
const handleDecrement = () => {
    if(count > 1){ 
        setCount(count - 1);
    }
  };
  const handleIncrement = () => {
      setCount(count + 1);
  };

/* isValid = true ise "siparis ver" butonuna basilacak ve 
axios kullanilarak post request atilacak */
const handleSubmit = (event) => {
    event.preventDefault();
    const updatedForm = { ...form, miktar: count };

    if (isValid === true) {
        axios.post("https://reqres.in/api/pizza", updatedForm)
            .then(response => {
                onSubmit(response.data);
                history.push("/siparis-alindi");
            })
            .catch(error => console.error(error));
    } else {
        console.error("Sipariş verileri eksik veya hatalı!");
    }
};


return (
    <>
    {/*--------Logo-----------*/}
    <header className='form-header'>
      <img src={LogoSVG} alt="Logo" />
    </header>
    {/*--------Pizza Info-----------*/}
    <section className='bej-part'>
      <div className='bej-part-icerik'>
        <img src="../../Assets/Iteration-2-aseets/pictures/form-banner.png" alt="FormBanner" />
        <nav className='nav-menu'>
          <a href="/">Anasayfa </a>
          <p> - </p>
          <a href="/siparis-olustur"> Sipariş Oluştur</a>
        </nav>
        <h2>Position Absolute Acı Pizza</h2>
        <div className='pizza-info'>
          <h1>85.5 ₺</h1>
          <p>4.9</p>
          <p>(200)</p>
        </div>
        <p style={{color: '#5F5F5F'}} >Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
      </div>
        
      </section>
    {/*--------Sipariş Formu-----------*/}
    <Form className="order-pizza-form" onSubmit={handleSubmit}>
        <section className='boyut'>
          {/* Pizza boyutu */}
          <div className="form-group-row">
            <FormGroup >
              <Label>
                Boyut Seç*
              </Label>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  value="S"
                  onChange={handleChange} 
                   />
                {' '}
                <Label check>
                  S
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  value="M"
                  onChange={handleChange}
                   />
                {' '}
                <Label check>
                  M
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="boyut"
                  type="radio"
                  value="L"
                  onChange={handleChange}
                   />
                {' '}
                <Label check>
                  L
                </Label> 
              {errors.boyut && <FormFeedback>{errorMessages.boyut}</FormFeedback>}
              </FormGroup>
            </FormGroup>
          </div>
          {/* Hamur kalınlığı */}
          <div className="form-group-row">
              <FormGroup>
                <Label for="hamurKalınlıgı">
                  Hamur Seç*
                </Label>
                <Input
                  id="hamurKalınlıgı"
                  name="hamur"
                  type="select"
                  onChange={handleChange}
                >
                  <option value="">- Hamur Kalınlığı Seç -</option>
                  <option value="Süpper İnce">Süpper İnce</option>
                  <option value="İnce">İnce</option>
                  <option value="Orta">Orta</option>
                  <option value="Kalın">Kalın</option>
                </Input> {errors.hamur && <FormFeedback>{errorMessages.hamur}</FormFeedback>}
              </FormGroup>
          </div>
        </section>
          {/*Ek malzemeler*/}
          <section className='ekMalzemeler'>
            <FormGroup
              check
            >
              <Label for="ekMalzemeler">
                Ek Malzemeler
              </Label>
              <FormText htmlFor="ekMalzemeler">
                En az 4, en fazla 10 malzeme seçebilirsiniz. Malzeme başı 5 tl ek ücret.
              </FormText> <br />
              <div className="material-columns">
                {malzemeler.map(malzeme => (
                <div className="material-item" key={malzeme.name}>
                  <Input type="checkbox" onChange={handleChange} name={malzeme.name} />
                  <Label check>{malzeme.label}</Label>
                </div>
                ))}
              </div>
              <FormFeedback>{errors.malzemeler}</FormFeedback>
            </FormGroup>
          </section>
          {/* İsim - Soyisim */}
          <section>
          <FormGroup className='form-text-area'>
            <Label for="isimSoyisim">
              İsim-Soyisim*
            </Label>
            <Input
              id="isimSoyisim"
              name="isimSoyisim"
              placeholder="Lütfen isminizi girin."
              type="text"
              value={form.isimSoyisim}
              onChange={handleChange}
              invalid={errors.isimSoyisim !== ""} 
              />
            <FormFeedback>{errors.isimSoyisim}</FormFeedback>
          </FormGroup> 
          </section>
          {/* Sipariş notu */}
          <section>
          <FormGroup className='form-text-area'>
            <Label for="siparisNotu">Sipariş Notu</Label>
            <Input
              id="siparisNotu"
              name="siparisNotu"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="text"
              onChange={handleChange}
              />
          </FormGroup>
          </section>  
      </Form>
      {/*---------Ödeme Kısmı--------- */}
      <section className='payment-container'>
          <div className="sayac-container">
              <Button type='button' onClick={handleDecrement}>-</Button>
              <p className="sayac-value">{count}</p>
              <Button type='button' onClick={handleIncrement}>+</Button>
            </div>
            <div className='siparis-container'>
              <h2>Sipariş Toplamı</h2>
              <div><p>Seçimler</p>  <p>{form.malzemeler.length * 5} ₺</p></div>
              <div><p>Toplam</p>  <p>{(85.5 * count) + (form.malzemeler.length * 5)} ₺</p></div>
              <Button onClick={handleSubmit} size="lg" type='submit' disabled={!isValid}>SİPARİŞ VER</Button>
            </div>
      </section>
      <Footer />
      </>
    )
    
}