import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const texto =
`# 🎨 Teste de Markdown Estiloso

Bem-vindo ao **modo estiloso** do seu Markdown em React!  
Aqui você pode misturar *Markdown*, \`<div>\`, \`<span>\`, cores, fontes e até animação CSS se quiser.

---

## 🌈 Texto colorido

<span style="color:#ff4d4d; font-weight:bold;">Vermelho poderoso</span>  
<span style="color:#4da6ff;">Azul triste porém elegante</span>  
<span style="color:#33cc33; font-style:italic;">Verde suave e relaxado</span>  
<span style="color:#ff66ff; text-decoration:underline;">Rosa dramaticamente sublinhado</span>

---

## 🧱 Dentro de uma div personalizada

<div style="
    padding: 16px; 
    background: linear-gradient(135deg, #191919, #3a3a3a); 
    border-radius: 10px; 
    color: #fff; 
    border: 1px solid #666;
">
    <h2 style="margin-top:0;">✨ Bloco Especial</h2>

    <p>
        Você pode colocar qualquer coisa aqui, inclusive elementos HTML, 
        e seu componente React vai renderizar <strong>lindamente</strong>.
    </p>

    <p style="color:#ffdb4d;">
        ⭐ Inclusive textos com cores diferentes!
    </p>
</div>

---

## 🔥 Título com brilho (CSS inline)

<h2 style="
    color: #ffdf6b;
    text-shadow: 0 0 8px #ffdf6b, 0 0 14px #ffae00;
">
    🔥 Título Flamejante 🔥
</h2>

---

## ✔ Lista estilizada

<ul>
    <li><span style="color:#ff6b6b;">Item em vermelho</span></li>
    <li><span style="color:#6bff95;">Item em verde</span></li>
    <li><span style="color:#6bc5ff;">Item em azul</span></li>
</ul>

---

## 💫 Bônus: texto piscando (CSS puro!)

<span style="
    color:#ff66c4;
    animation: blink 1s infinite;
">
✨ Este texto está piscando! ✨
</span>

<style>
@keyframes blink {
    0% { opacity: 1; }
    50% { opacity: .3; }
    100% { opacity: 1; }
}
</style>
`;

const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'style'],
  attributes: {
    ...defaultSchema.attributes,
    // permite style e class globalmente
    '*': [...(defaultSchema.attributes?.['*'] || []), 'style', 'class'],
    // opcional: repetir para elementos específicos
    span: [...(defaultSchema.attributes?.span || []), 'style', 'class'],
    div: [...(defaultSchema.attributes?.div || []), 'style', 'class'],
  }
};


export const TesteMarkdown = () => {
    return (
        <Markdown rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}>
            {texto}
        </Markdown>
    );
}
