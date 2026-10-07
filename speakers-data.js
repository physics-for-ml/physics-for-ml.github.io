// Optional per-talk fields: `time`, `abstract`, `recording`, `slides`.
//
// `time` is a free-form string shown next to the date, e.g. "10:00 CET" or
// "16:00-17:30 CEST". Leave it out for talks at the standing slot (the
// bi-weekly Thursday 10:00 CET schedule stated on the front page).
//
// `abstract` is plain text. Leave it out (or empty) and nothing is shown.
// Separate paragraphs with a blank line:
//
//     abstract: `First paragraph of the abstract.
//
//     Second paragraph.`,
//
// On past talks it appears under "Abstract" in the expandable details panel;
// on the next upcoming talk it is shown directly on the front-page card.

const SPEAKERS_DATA = [    
    {
        name: "Katharine Fisher",
        affiliation: "Massachusetts Institute of Technology",
        date: "Thursday, October 8, 2026",
        time: "3:30 PM CEST",
        title: "Does adding gradient data to the training set help neural networks learn?",
        abstract: "Gradient information is widely useful and available in applications, and is therefore natural to include in the training of neural networks. In particular, in materials modeling, it is common to use force data to train potential energy surfaces. Yet little is known theoretically about the impact of Sobolev training—regression with both function and gradient data—on the generalization error of highly overparameterized predictive models in high dimensions. In this talk, we present a precise characterization of this training modality for random feature (RF) models in the limit where the number of trainable parameters, input dimensions, and training data tend proportionally to infinity. Our model for Sobolev training reflects practical implementations by sketching gradient data onto finite dimensional subspaces. By combining the replica method from statistical physics with linearizations in operator-valued free probability theory, we derive a closed-form description for the generalization errors of the trained RF models. For target functions described by single- index models, we demonstrate that supplementing function data with additional gradient data does not universally improve predictive performance. Rather, the degree of overparameterization should inform the choice of training method. If time permits, we will discuss ongoing extensions of this work to feature learning as well as to the construction of energy surfaces for atomistic models.",
        publications: [ 
          {           
          }
        ]
    },
    {
        name: "Christian Keup",
        affiliation: "University of Parma",
        date: "Thursday, July 9, 2026",
        title: "Kernel rescaling for deep nets in the details: A parsimonious baseline theory",
        publications: [ 
          {
	        title: "Kernel Renormalization in Bayesian Deep Neural Networks: the Equivalent Wishart Ansatz in the Proportional Regime",
		authors: "Paolo Baglioni, Christian Keup, Vincenzo Zimbardo, Rosalba Pacelli, Alessandro Vezzani, Raffaella Burioni, Pietro Rotondo",
		year: "2026",
		url: "https://arxiv.org/pdf/2605.29684"
            }
        ]
    },
    {
        name: "Emanuele Natale",
        affiliation: "CNRS, Université Côte d'Azur",
        date: "Thursday, July 27, 2026",
        title: "The Strong Lottery Ticket Hypothesis: Random Subset Sums, Sparsity, and Structure",
        abstract: "Large random neural networks appear to already contain, at initialization, subnetworks that match the accuracy of trained ones. This phenomenon, the Strong Lottery Ticket Hypothesis (SLTH), recasts pruning as a question about random structure rather than training dynamics, and it turns out to have a clean combinatorial core: a reduction from neural-network approximation to the random subset-sum problem, where logarithmic overparameterization suffices precisely because exponentially many subset sums densely cover an interval. In this theorem-oriented overview I will use this single tool, in four guises, to organize the theory: scalar subset sums for convolutional networks, multidimensional subset sums for structured (filter) pruning, fixed-size subset sums for explicit sparsity guarantees, and a discrete variant (linked to the number-partitioning problem and its statistical-physics phase transition) for quantized weights. The talk closes with open problems on lower bounds, transformers, and multidimensional random subset sums.",
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
