<template>
  <div>
    <Breadcrumb :tipos="tipos" />
    <main class="container">
      <SectionLocacao
        :id="tipo.titulo"
        v-for="(tipo, index) in tipos"
        :v-if="tipo.lista.length > 0"
        :key="index"
        :titulo="tipo.titulo"
        :descricao="tipo.descricao"
        :locacoes="tipo.lista"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import SectionLocacao from "../components/SectionLocacao.vue";
import ILocacao from "@/interfaces/ILocacao";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    SectionLocacao,
    Breadcrumb,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL || "http://localhost:8080/",
      locacoes: [] as ILocacao[],
      republicas: [] as ILocacao[],
      kitnets: [] as ILocacao[],
      apartamentos: [] as ILocacao[],
      tipos: [] as Array<{
        titulo: string;
        descricao: string;
        lista: ILocacao[];
      }>,
    };
  },
  mounted() {
    const json = {
      locacoes: [
        {
          tipoLocacao: "Republica - Republica casa amarela",
          tipoVaga: "",
          contato: "(34) 92224211",
          endereco: "",
          informacoes: "",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Republica - Breja Flor",
          tipoVaga: "Feminina",
          contato: "(12) 99209-9682",
          endereco: "Rua prefeito tigre maia, 912 - BPS",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Republica 12 Macakos",
          tipoVaga: "",
          contato: "(32) 999963335",
          endereco: "Rua prefeito tigre maia, 636 - BPS",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Republica Of Thrones ",
          tipoVaga: "Masculina",
          contato: "(12) 98881-9605",
          endereco: "Rua Dr. Domiciano Costa Moreira, 123 - Pinheirinho",
          informacoes: "Vaga para dividir (rep mista)",
          instagram: "https://instagram.com/rep_ofthrones?utm_medium=copy_link",
          "": "",
        },
        {
          tipoLocacao: "República Manicômio ",
          tipoVaga: "",
          contato: "(11) 98955-0909",
          endereco: "Rua Antônio Simão Mauad, 939",
          informacoes: "Vaga individual e para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Os Perdidão ",
          tipoVaga: "Masculina",
          contato: "(12) 99172-5164",
          endereco: "Rua Dr Vicente Vilella Viana , 446 - Cruzeiro",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Santo Grau",
          tipoVaga: "Masculina",
          contato: "(35) 984694025",
          endereco: "Rua Coronel Francisco Braz, 1270 - Pinheirinho",
          informacoes: "Vaga para dividir (suíte)",
          instagram: "https://www.instagram.com/republicasantograuitajuba/",
          "": "",
        },
        {
          tipoLocacao: "República Donald's",
          tipoVaga: "",
          contato: "(35) 92000-7531",
          endereco: "Rua Dr. Silvestre Ferraz, 629 - Pinheirinho",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Aioba  ",
          tipoVaga: "",
          contato: "(35) 99156-9246",
          endereco: "Rua Antônio Simão Mauad, 776-Pinheirinho ",
          informacoes: "vaga para dividir ",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Repúbica Repecado",
          tipoVaga: "Feminina",
          contato: "(12)99168-3524",
          endereco: "R. Deputado Luiz Fernando, 592 - Pinheirinho",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Sbornia",
          tipoVaga: "",
          contato: "(35) 991350704",
          endereco: "Av. BPS, 369, Pinheirinho",
          informacoes: "vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Casgata",
          tipoVaga: "",
          contato: "(19) 99894-9998",
          endereco: "Rua Coronel Francisco Braz, 1269 - BPS",
          informacoes: "vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Republica Laranjinhas",
          tipoVaga: "Feminina ",
          contato: "(12) 99745-6177",
          endereco: "Rua Antonio Simao Mauad, 668, BPS",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Saia Justa",
          tipoVaga: "Feminina ",
          contato: "(12) 981175087",
          endereco: "Rua Prefeito Tigre Maia  879. BPS",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Estábulo",
          tipoVaga: "Masculina",
          contato: "(11) 99937-7675",
          endereco: "Rua Professor Souza Nilo, 10 - Pinheirinho",
          informacoes: "Vaga para dividir (suíte)",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Treme",
          tipoVaga: "Masculina",
          contato: "(19) 99331-8469",
          endereco: "Rua Comendador Marcos Grilo, 100",
          informacoes: "Vaga para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Havana 🏴‍☠️",
          tipoVaga: "Masculina ",
          contato: "(12) 99133-1748",
          endereco: "Rua Professor Souza Nilo, 54 - Pinheirinho ",
          informacoes: "Vagas para dividir (suíte)",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Mukifo",
          tipoVaga: "Masculina",
          contato: "(35) 3622-6228",
          endereco: "Av. BPS, 1766 (Em frente a UNIFEI)",
          informacoes: "Vagas para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Alcatraz",
          tipoVaga: "Masculina",
          contato: "(12) 99119-6987",
          endereco: "R. Antônio Simão Mauad, 480 - Pinheirinho",
          informacoes: "Vaga individual e para dividir",
          instagram: "https://www.instagram.com/repalcatrazunifei/",
          "": "",
        },
        {
          tipoLocacao: "República Inconfidentes ",
          tipoVaga: "Masculina",
          contato: "(11) 96446-8920",
          endereco: "Rua Coronel Rennó, 1252 (Em frente à UNIFEI) ",
          informacoes: "Vagas para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República K2",
          tipoVaga: "Masculina",
          contato: "(19) 971344022",
          endereco: "Rua Olávo Bilac, 137 - Centro",
          informacoes: "Vagas para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Santa Casa",
          tipoVaga: "Masculina ",
          contato: "(12) 981078054",
          endereco: "Rua Mario Braz, 22 - Pinheirinho ",
          informacoes: "Vaga individual e para dividir (suite)",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "República Maria Cuervo",
          tipoVaga: "Feminina ",
          contato: "(11) 98602-5014",
          endereco: "Rua Prefeito Tigre Maia, 650 - BPS",
          informacoes: "Vagas para dividir",
          instagram: "https://www.instagram.com/republicamariacuervo/",
          "": "",
        },
        {
          tipoLocacao: "República Coqueiro",
          tipoVaga: "Masculina",
          contato: "(11) 988451125",
          endereco: "Rua Antônio Simão Mauad, 851 - BPS",
          informacoes: "Vagas para dividir",
          instagram:
            "https://instagram.com/republicacoqueiro?utm_medium=copy_link",
          "": "",
        },
        {
          tipoLocacao: "República Ouro Verde",
          tipoVaga: "Masculina",
          contato: "(19) 99675-3640",
          endereco: "Rua Dr. Domiciano Costa Moreira, 137 - Pinheirinho",
          informacoes: "Vagas individual e para dividir ",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 99917-1991",
          endereco: "Rua Heitor Pires, 20 - 37500226",
          informacoes: "Vaga individual",
          instagram: "https://kitnetitajuba.negocio.site",
          "": "",
        },
        {
          tipoLocacao: "Apartamento",
          tipoVaga: "",
          contato: "(35) 36221274",
          endereco: "",
          informacoes: "Vaga individual",
          instagram:
            "https://www.mohallemimoveis.com.br/imovel/kitnet-de-12-m-cruzeiro-itajuba-aluguel-por-r-580-mes/KN0014-MPJ?from=rent",
          "": "",
        },
        {
          tipoLocacao: "Apartamento",
          tipoVaga: "",
          contato: "(35) 36221274",
          endereco: "",
          informacoes: "Vaga individual",
          instagram:
            "https://www.mohallemimoveis.com.br/imovel/kitnet-com-1-dormitorio-para-alugar-20-m-por-r-630-00-mes-cruzeiro-itajuba-mg/KN0013-MPJ?from=rent",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 98886-1920",
          endereco: "Rua Dr. João de Azevedo, nº 496, Centro, Itajubá-MG",
          informacoes: "Vaga individual",
          instagram:
            "https://www.calcadaoimoveis.com.br/imovel/kitnet-para-locacao-centro-itajuba/KN0007-CCO?from=rent",
          "": "",
        },
        {
          tipoLocacao: "República 13",
          tipoVaga: "Masculina",
          contato: "(11) 998310305",
          endereco: "Rua Antônio Simão Mauad, 492 - Pinheirinho",
          informacoes: "Vaga individual e para dividir",
          instagram: "",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 98886-1920",
          endereco: "Rua José Verano da Silva, nº 263, Cruzeiro, Itajubá-MG",
          informacoes: "Vaga individual",
          instagram:
            "https://www.calcadaoimoveis.com.br/imovel/kitnet-com-1-dormitorio-para-alugar-20-m-por-600-mes-cruzeiro-itajuba-mg/KN0014-CCO?from=rent",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 36221274",
          endereco: "",
          informacoes: "Vaga individual",
          instagram:
            "https://www.mohallemimoveis.com.br/imovel/kitnet-de-30-m-cruzeiro-itajuba-aluguel-por-r-1-000-mes/KN0001-MPJ?from=rent",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 98862 5085",
          endereco:
            "José Maria Aflallo, N° 120, 18 Bairro Nossa Sra. da Agonia",
          informacoes: "Vaga individual",
          instagram:
            "https://candidoimoveis.com/index.php?conteudo=fotografias&categoria=7772",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 98862 5085",
          endereco:
            "Rua Doutor Joao de Azevedo, N° 496, apto 305, Edificio JP Bairro Centro",
          informacoes: "Vaga individual",
          instagram:
            "https://candidoimoveis.com/index.php?conteudo=fotografias&categoria=8134",
          "": "",
        },
        {
          tipoLocacao: "Flat",
          tipoVaga: "",
          contato: "(35) 98862 5085",
          endereco: "Rua Heitor Pires, N° 60, Apto 01, Bairro Estiva",
          informacoes: "Vaga individual",
          instagram:
            "https://candidoimoveis.com/index.php?conteudo=fotografias&categoria=8676",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "(35) 98862 5085",
          endereco: "Avenida BPS, N° Ed. Adriana Maria, Bairro BPS",
          informacoes: "Vaga individual",
          instagram:
            "https://candidoimoveis.com/index.php?conteudo=fotografias&categoria=9061",
          "": "",
        },
        {
          tipoLocacao: "Apartamento",
          tipoVaga: "",
          contato: "(35) 98862 5085",
          endereco:
            "Rua Sergio Lima da Costa, N° 402, aptos 202 , Bairro Agonia",
          informacoes: "Vaga individual",
          instagram:
            "https://candidoimoveis.com/index.php?conteudo=fotografias&categoria=9151",
          "": "",
        },
        {
          tipoLocacao: "Apartamento",
          tipoVaga: "",
          contato: "(35) 98817-7549",
          endereco: "Rua Mário Brás, 687",
          informacoes: "Vaga individual",
          instagram:
            "https://www.acaoimoveisitajuba.com.br/alugar/mg/itajuba/bps/apartamento/32110804",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "",
          endereco: "Rua José Verano da Silva 263",
          informacoes: "Vaga individual",
          instagram:
            "https://www.facebook.com/marketplace/item/1733508466857216/?ref=search&referral_code=marketplace_search&referral_story_type=post&tracking=browse_serp%3Acfb96586-424d-4c58-a71c-d01d5e9a9a36",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "",
          endereco: "Av. BPS ao lado do SHITAKE",
          informacoes: "Vaga individual",
          instagram:
            "https://www.facebook.com/marketplace/item/353997089531920/?ref=search&referral_code=marketplace_search&referral_story_type=post&tracking=browse_serp%3Acfb96586-424d-4c58-a71c-d01d5e9a9a36",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "",
          endereco: "Avenida Bps, 975, Itajubá, MG",
          informacoes: "Vaga individual",
          instagram:
            "https://www.facebook.com/marketplace/item/410102327314968?ref=search&referral_code=marketplace_search&referral_story_type=post&tracking=browse_serp%3Acfb96586-424d-4c58-a71c-d01d5e9a9a36",
          "": "",
        },
        {
          tipoLocacao: "Kitnet",
          tipoVaga: "",
          contato: "",
          endereco: "",
          informacoes: "Vaga individual",
          instagram:
            "https://www.facebook.com/groups/476719355699913/permalink/4729491013756038/",
          "": "",
        },
        {
          tipoLocacao: "Republica Marisalles",
          tipoVaga: "Masculina",
          contato: "(16) 99384-3333",
          endereco: "Av. Antonio Simão Mauá, nº 775, BPS",
          informacoes: "Vaga individual e para dividir",
          instagram:
            "https://instagram.com/republicamarisalles?utm_medium=copy_link",
          "": "",
        },
        {
          tipoLocacao: "República H-Romeu",
          tipoVaga: "Masculina",
          contato: "(35) 9890-1713",
          endereco: "Avenida BPS, 342 (Ao lado do Iwata)",
          informacoes: "Vaga para dividir",
          instagram: "https://instagram.com/hromeu.itajuba?r=nametag",
          "": "",
        },
      ],
    };

    this.locacoes = json["locacoes"] as ILocacao[];

    this.republicas = json["locacoes"].filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("rep")
    );

    this.kitnets = json["locacoes"].filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("kit")
    );

    this.apartamentos = json["locacoes"].filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("ap")
    );

    this.tipos = [
      {
        titulo: "Repúblicas",
        descricao: "Lista de republicas disponíveis em nosso sistema.",
        lista: this.republicas,
      },
      {
        titulo: "Kitnets",
        descricao: "Lista de kitnets disponíveis em nosso sistema.",
        lista: this.kitnets,
      },
      {
        titulo: "Apartamentos",
        descricao: "Lista de apartamentos disponíveis em nosso sistema.",
        lista: this.apartamentos,
      },
    ];

    // axios.get("http://localhost:3000/locacoes").then((response) => {
    //   this.locacoes = response.data as ILocacao[];

    //   this.republicas = response.data.filter((locacao: ILocacao) =>
    //     locacao.tipoLocacao.toLowerCase().includes("rep")
    //   );

    //   this.kitnets = response.data.filter((locacao: ILocacao) =>
    //     locacao.tipoLocacao.toLowerCase().includes("kit")
    //   );

    //   this.apartamentos = response.data.filter((locacao: ILocacao) =>
    //     locacao.tipoLocacao.toLowerCase().includes("ap")
    //   );

    //   this.tipos = [
    //     {
    //       titulo: "Repúblicas",
    //       descricao: "Lista de republicas disponíveis em nosso sistema.",
    //       lista: this.republicas,
    //     },
    //     {
    //       titulo: "Kitnets",
    //       descricao: "Lista de kitnets disponíveis em nosso sistema.",
    //       lista: this.kitnets,
    //     },
    //     {
    //       titulo: "Apartamentos",
    //       descricao: "Lista de apartamentos disponíveis em nosso sistema.",
    //       lista: this.apartamentos,
    //     },
    //   ];
    // });
  },
});
</script>

<style></style>
