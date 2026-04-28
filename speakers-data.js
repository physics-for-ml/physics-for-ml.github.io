const SPEAKERS_DATA = [
    {
        name: "Emanuele Natale",
        affiliation: "",
        date: "Thursday, June 11, 2026",
        title: "",
        publications: []
    },
    {
        name: "Jean Barbier",
        affiliation: "ICTP Trieste",
        date: "Thursday, February 12, 2026",
        title: "Statistical physics of deep (supervised) learning",
        publications: [
            {
	        title: "Statistical physics of deep learning: Optimal learning of a multi-layer perceptron near interpolation",
		authors: "Jean Barbier, Francesco Camilli, Minh-Toan Nguyen, Mauro Pastore, Rudy Skerk",
		year: "2025",
		url: "https://arxiv.org/pdf/2510.24616"
            }
        ],
        recording: "https://fz-juelich.sciebo.de/public.php/dav/files/46JwQe37HtTxfHK/video1592988713.mp4",
        slides: "https://fz-juelich.sciebo.de/public.php/dav/files/eqaSJNrCxkqk2mJ/"
    },
    {
        name: "Lorenzo Tiberi",
        affiliation: "Harvard University",
        date: "Tuesday, January 27, 2026",
        title: "Dissecting the Interplay of Attention Paths in a Statistical Mechanics Theory of Transformers",
        publications: [
            {
                title: "Dissecting the Interplay of Attention Paths in a Statistical Mechanics Theory of Transformers",
                authors: "Lorenzo Tiberi Francesca Mignacco, Kazuki Irie, Haim Sompolinsky",
                year: "2024",
                url: "https://proceedings.neurips.cc/paper_files/paper/2024/file/8523a98265ceae12afd34113aa6c5cca-Paper-Conference.pdf"
            }
        ]
    },
    {
        name: "Jacob Zavatone-Veth",
        affiliation: "Harvard University",
        date: "Tuesday, January 20, 2026",
        title: "Risk and cross validation in ridge regression with correlated samples",
        publications: [
            {
                title: "Risk and cross validation in ridge regression with correlated samples",
                authors: "Alexander Atanasov, Jacob A. Zavatone-Veth, Cengiz Pehlevan",
                year: "2025",
                url: "https://openreview.net/pdf?id=GMwKpJ9TiR"
            }
        ]
    },
    {
        name: "Noa Rubin",
        affiliation: "Hebrew University, Jerusalem",
        date: "Tuesday, November 25, 2025",
        title: "Mitigating the curse of detail: Scaling arguments for sample complexity and feature learning",
        publications: [
            {
                title: "Mitigating the curse of detail: Scaling arguments for sample complexity and feature learning",
                authors: "Noa Rubin, Orit Davidovich, and Zohar Ringel",
                year: "2025",
                url: "https://arxiv.org/pdf/2512.04165"
            }
        ]
    },
    {
        name: "Noam Itzhak Levi",
        affiliation: "EPFL",
        date: "Tuesday, July 1, 2025",
        title: "The Physics of Learnable Data",
        publications: [
            {
                title: "The Underlying Scaling Laws and Universal Statistical Structure of Complex Datasets",
                authors: "Noam Levi, Yaron Oz",
                year: "2023",
                url: "https://arxiv.org/pdf/2306.14975"
            },
            {
                title: "The Universal Statistical Structure and Scaling Laws of Chaos and Turbulence",
                authors: "Noam Levi, Yaron Oz",
                year: "2023",
                url: "https://arxiv.org/pdf/2311.01358"
            },
            {
                title: "Probing the Latent Hierarchical Structure of Data via Diffusion Models",
                authors: "Antonio Sclocchi, Alessandro Favero, Noam Itzhak Levi, Matthieu Wyart",
                year: "2024",
                url: "https://arxiv.org/pdf/2410.13770"
            }
        ],
        recording: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_2025_07_01_Noam_Levi.mp4",
        slides: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_1_7_25_Noam_Levi.pdf"
    },
    {
        name: "Oren Neumann",
        affiliation: "Goethe Universität Frankfurt",
        date: "Tuesday, June 17, 2025",
        title: "Reinforcement Learning and Scaling Laws: a Case Study of AlphaZero",
        publications: [
            {
                title: "Scaling Laws for a Multi-Agent Reinforcement Learning Model",
                authors: "Oren Neumann, Claudius Gros",
                year: "2022",
                url: "https://arxiv.org/abs/2210.00849"
            },
            {
                title: "AlphaZero Neural Scaling and Zipf's Law: a Tale of Board Games and Power Laws",
                authors: "Oren Neumann, Claudius Gros",
                year: "2024",
                url: "https://arxiv.org/abs/2412.11979"
            }
        ],
        recording: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_2025_06_17_Oren_Neumann.mp4",
        slides: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_17_06_25_Oren_Neumann.pdf"
    },
    {
        name: "Marcel Kühn",
        affiliation: "Universität Leipzig",
        date: "Tuesday, June 3, 2025",
        title: "Anti-Correlated Noise in Epoch-Based Stochastic Gradient Descent and its Implications",
        publications: [
            {
                title: "Correlated Noise in Epoch-Based Stochastic Gradient Descent: Implications for Weight Variances",
                authors: "Marcel Kühn, Bernd Rosenow",
                year: "2023",
                url: "https://arxiv.org/abs/2306.05300"
            }
        ],
        slides: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_3_6_2025_Marcel_Kuehn.pdf"
    },
    {
        name: "Noa Rubin<sup>1</sup>, Kirsten Fischer<sup>2,3</sup>, Javed Lindner<sup>2,3</sup>",
        affiliation: "<sup>1</sup>Hebrew University of Jerusalem, <sup>2</sup>Forschungszentrum Jülich, <sup>3</sup>RWTH Aachen",
        date: "Tuesday, May 20, 2025",
        title: "From Kernels to Features: A Multi-Scale Adaptive Theory of Feature Learning",
        publications: [
            {
                title: "From Kernels to Features: A Multi-Scale Adaptive Theory of Feature Learning",
                authors: "Noa Rubin, Kirsten Fischer, Javed Lindner",
                year: "2025",
                url: "https://arxiv.org/html/2502.03210v1"
            }
        ],
        slides: "https://fz-juelich.sciebo.de/public.php/dav/files/c3z3A4696lgIlz5/SPOT_Seminar_13_05_25_Rubin_Fischer_Lindner.pdf"
    },
    {
        name: "Alexander van Meegen",
        affiliation: "Harvard University",
        date: "Monday, June 17, 2024",
        title: "Coding schemes in deep networks",
        publications: []
    },
    {
        name: "Francesco Cagnetta",
        affiliation: "EPFL Lausanne",
        date: "Wednesday, February 7, 2024",
        title: "Learning hierarchical grammars with neural networks: towards a theory of deep representation learning",
        publications: []
    },
    {
        name: "Taro Toyoizumi",
        affiliation: "RIKEN",
        date: "Wednesday, November 15, 2023",
        title: "Information theoretical approaches to model synaptic plasticity",
        publications: []
    },
    {
        name: "Pietro Rotondo",
        affiliation: "University of Parma",
        date: "Tuesday, May 9, 2023",
        title: "Statistical mechanics of deep learning beyond the infinite-width limit",
        publications: []
    },
    {
        name: "Manfred Opper",
        affiliation: "TU Berlin",
        date: "Tuesday, May 2, 2023",
        title: "Computing learning curves for large machine learning models using the replica approach",
        publications: []
    },
    {
        name: "Bruno Loureiro",
        affiliation: "ENS Paris",
        date: "Tuesday, April 4, 2023",
        title: "Dimension-free limits of stochastic gradient descent for two-layers neural networks",
        publications: []
    },
    {
        name: "Kirsten Fischer",
        affiliation: "Forschungszentrum Jülich",
        date: "Tuesday, March 21, 2023",
        title: "",
        publications: []
    },
    {
        name: "Asem Wardak",
        affiliation: "Harvard University",
        date: "Tuesday, February 14, 2023",
        title: "Extended Anderson Criticality in Heavy-Tailed Neural Networks ",
        publications: []
    },
    {
        name: "Kirsten Fischer",
        affiliation: "Forschungszentrum Jülich",
        date: "Tuesday, January 17, 2023",
        title: "",
        publications: []
    },
    {
        name: "Jamie Simon",
        affiliation: "UC Berkeley",
        date: "Tuesday, December 20, 2022",
        title: "",
        publications: []
    }
]
