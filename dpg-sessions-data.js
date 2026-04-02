const DPG_SESSIONS_DATA = {
  "SOE 14": {
    "name": "Focus Session: Physics of AI I",
    "contributions": [
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/14/contribution/1",
        "session_heading": "SOE 14.1: Hauptvortrag",
        "title": "Generative AI and diffusion models: a statistical physics approach",
        "authors": [
          { "name": "Giulio Biroli", "affil_ids": ["1"], "presenter": false },
          { "name": "Tony Bonnaire", "affil_ids": ["2"], "presenter": true }
        ],
        "affiliations": {
          "1": "Ecole Normale Superieure, Paris, France",
          "2": "Universit\u00e9 Paris-Saclay, Orsay, France"
        },
        "day_date": "Donnerstag, 12. M\u00e4rz 2026",
        "time": "09:30\u201310:00",
        "room": "G\u00d6R/0226",
        "abstract": "Generative AI represents a groundbreaking development within the broader *Machine Learning Revolution,* significantly influencing technology, science, and society. In this colloquium, I will focus on the state-of-the-art *diffusion models*, which are currently used to generate images, videos, and sounds. They are very fascinating algorithms for physicists, as they are very much connected to concepts from stochastic thermodynamics, particularly time-reversed Langevin dynamics. These diffusion models start from a simple white noise input and make it evolve through a Langevin process to generate complex outputs such as images, videos, and sounds. I will show that statistical physics provides principles and methods to characterise this generation process. Specifically, I will discuss how phenomena such as the transition from memorization to generalization and the emergence of features can be understood through the lens of symmetry breaking, phase transitions, slow dynamics, and methods used to study disordered systems.",
        "keywords": "Generative AI; Statistical Physics; Out of equilibrium physics",
        "pdf_link": null
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/14/contribution/2",
        "session_heading": "SOE 14.2: Vortrag",
        "title": "Statistical Physics of Classifier-free Diffusion Guidance",
        "authors": [
          { "name": "Enrico Ventura", "affil_ids": ["1"], "presenter": true },
          { "name": "Beatrice Achilli", "affil_ids": ["1"], "presenter": false },
          { "name": "Carlo Lucibello", "affil_ids": ["1"], "presenter": false },
          { "name": "Luca Ambrogioni", "affil_ids": ["2"], "presenter": false }
        ],
        "affiliations": {
          "1": "Bocconi University, Milan, Italy",
          "2": "Radboud University, Nijmegen, The Netherlands"
        },
        "day_date": "Donnerstag, 12. M\u00e4rz 2026",
        "time": "10:00\u201310:15",
        "room": "G\u00d6R/0226",
        "abstract": "Classifier-free Guidance (CFG) is a simple yet effective technique that helps diffusion models better follow a user\u2019s prompt. By combining standard unconditional diffusion with diffusion conditioned on a specific class of the data, it steers generation toward samples (e.g. images, videos or text) that more clearly reflect the intended content. We propose a description of the sampling dynamics of a diffusion model under CFG based on the statistical mechanics of disordered systems. Specifically, we study the time-dependent transformation of the diffusion potential providing a quantitative prediction of the way a complex target distribution is deformed to improve data generation. Moreover, we leverage our results to propose alternative theory-based guidance schedules that enhance such beneficial effects.",
        "keywords": "Diffusion Models; Random Energy Model; Disordered Systems; Stochastic Processes; Mean Field Analysis",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/dresden26_ventura.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/14/contribution/3",
        "session_heading": "SOE 14.3: Vortrag",
        "title": "How to describe high-dimensional statistics by diagrammatic expansions around non-Gaussian theories",
        "authors": [
          { "name": "Tobias K\u00fchn", "affil_ids": [], "presenter": true },
          { "name": "Gabriel Mahuasa", "affil_ids": [], "presenter": false },
          { "name": "Ulisse Ferrari", "affil_ids": [], "presenter": false }
        ],
        "affiliations": {},
        "day_date": "Donnerstag, 12. M\u00e4rz 2026",
        "time": "10:15\u201310:30",
        "room": "G\u00d6R/0226",
        "abstract": "Approximations for entropies and free energies are at the core of many techniques for the analysis of high-dimensional data, for example message-passing algorithms. For the problem of extensive-rank matrix factorization, e.g., the corresponding free energy has recently been computed by means of a high-temperature expansion around a non-Gaussian theory (Maillard et al. 2022). Their results, however, were partly inconclusive, notably because the structure of the perturbative series was not entirely clear. Feynman diagrams are designed to solve this problem, however, non-Gaussianity has mostly prevented their use. We lift this restriction in our novel framework (K\u00fchn & Helias 2018, K\u00fchn & van Wijland 2023, K\u00fchn 2026).",
        "keywords": null,
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/KuehnMahuasFerrari_Diagrams_DPG26.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/14/contribution/6",
        "session_heading": "SOE 14.6: Vortrag",
        "title": "Testing generalization through tiny task switching frameworks",
        "authors": [
          { "name": "Daniel Henrik Nevermann", "affil_ids": [], "presenter": true },
          { "name": "Claudius Gros", "affil_ids": [], "presenter": false }
        ],
        "affiliations": {},
        "day_date": "Donnerstag, 12. M\u00e4rz 2026",
        "time": "10:30\u201310:45",
        "room": "G\u00d6R/0226",
        "abstract": "With an ever-growing interest in advancing the performance and efficiency of large language models (LLMs), and therein particularly the transformer architecture, the need for tiny testing frameworks is pressing, as many researchers cannot afford to train models on large GPU clusters. We here propose a tiny testing framework, extending the recently published IARC task switching framework, that despite being trivial to implement offers suitable complexity to be non-trivial to learn for small scale transformer models with a few million parameters or less. Beyond model benchmarking, the framework is also suitable for probing phenomena relevant to problems arising in physics of AI, where controlled, interpretable testbeds are essential. The proposed training and evaluation scheme relies on integer sequences to be predicted by the model. These integer sequences are generated by simple deterministic tasks designed to abstract typical challenges arising in natural language processing, such as short and long range correlations, or context awareness. Within the sequences, tasks are randomly switched, where a switch is indicated by a control token. An important quality of LLMs is the ability to generalize at inference time. We here extend the existing task switching framework with new tasks able to probe models generalization capacities in a tiny, yet meaningful manner.",
        "keywords": "transformer; task switching framework; generalization; tiny testing frameworks; physics of AI",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/nevermann_gros_physAIDPG26.pdf"
      }
    ]
  },
  "SOE 17": {
    "name": "Focus Session: Physics of AI II",
    "contributions": [
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/1",
        "session_heading": "SOE 17.1: Hauptvortrag",
        "title": "What can we learn from neural quantum states?",
        "authors": [
          { "name": "Brandon Barton", "affil_ids": ["10"], "presenter": false },
          { "name": "Juan Carrasquilla", "affil_ids": ["10"], "presenter": false },
          { "name": "Anna Dawid", "affil_ids": ["9"], "presenter": false },
          { "name": "Antoine Georges", "affil_ids": ["3,6,7,8"], "presenter": false },
          { "name": "Megan Schuyler Moss", "affil_ids": ["1,2"], "presenter": false },
          { "name": "Alev Orfi", "affil_ids": ["3,4"], "presenter": true },
          { "name": "Christopher Roth", "affil_ids": ["3"], "presenter": false },
          { "name": "Dries Sels", "affil_ids": ["3,4"], "presenter": false },
          { "name": "Anirvan Sengupta", "affil_ids": ["3,5"], "presenter": false },
          { "name": "Agnes Valenti", "affil_ids": ["3"], "presenter": false }
        ],
        "affiliations": {
          "1": "Perimeter Institute for Theoretical Physics, Waterloo",
          "2": "University of Waterloo, Waterloo",
          "3": "Flatiron Institute, New York",
          "4": "New York University, New York",
          "5": "Rutgers University, New Jersey",
          "6": "Coll\u00e8ge de France, Paris",
          "7": "\u00c9cole Polytechnique, Paris",
          "8": "Universit\u00e9 de Gen\u00e8ve, Gen\u00e8ve",
          "9": "Universiteit Leiden, The Netherlands",
          "10": "ETH Z\u00fcrich, Switzerland"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "09:30\u201310:00",
        "room": "G\u00d6R/0226",
        "abstract": "Neural quantum states (NQS) provide flexible parameterizations of quantum many-body wave-functions that serve as powerful tools for the ground-state search. At the same time, NQS offer something that standard machine-learning tasks and datasets fundamentally lack: a known underlying Hamiltonian and quantum-physics tools that allow direct examination of the encoded wavefunction. This additional structure makes NQS an interesting platform for probing the behavior of classical neural networks themselves.\nI will first show how pruning and scaling-law phenomena change when the learning task is the quantum wavefunction itself, and link effects depend on the underlying Hamiltonian.\nI will then discuss generalization and double descent through the lens of quantum observables, by analyzing how NQS fail at the interpolation threshold.\nFinally, I will discuss how these results relate back to practical consequences for training and architecture search in the context of the ground state search for quantum many-body systems.",
        "keywords": "Neural quantum states; Machine learning; Quantum phase transitions; Overparameterization",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/NQS_double_descent.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/3",
        "session_heading": "SOE 17.3: Vortrag",
        "title": "Online Learning Dynamics and Neural Scaling Laws for a Perceptron Classification Problem",
        "authors": [
          { "name": "Yoon Thelge", "affil_ids": [], "presenter": true },
          { "name": "Marcel Kuhn", "affil_ids": [], "presenter": false },
          { "name": "Bernd Rosenow", "affil_ids": [], "presenter": false }
        ],
        "affiliations": {},
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "10:00\u201310:15",
        "room": "G\u00d6R/0226",
        "abstract": "Understanding neural scaling laws and emergence of power law generalisations remains a central challenge in learning dynamics. A natural setting for analysing this behaviour is the online-learning dynamics of a perceptron trained in a teacher\u2013student scenario, where in the thermodynamic limit, the generalisation error exhibits characteristic power-law decay. In realistic classification problems, the teacher is a discrete classifier, while standard gradient-based training requires the student to have continuous outputs. Thus, in practically relevant settings the student is necessarily mismatched to the discrete teacher, a regime that is less well understood. We study this regime for a perceptron with a sign-activation teacher and an error-function student. We derive coupled differential equations for the evolution of the relevant order parameters and verify them via numerical integration and SGD simulations. For fixed learning rates, the generalisation error converges to zero as a power-law with respect to the number of training examples with an exponent of -1/3. The onset of this asymptotic regime shifts with the learning rate, and the generalisation at the onset scales with exponent -1/2, motivating the use of learning-rate schedules to enhance the effective asymptotic decay.",
        "keywords": "Neural Networks; Online learning; Neural scaling laws; Statistical Mechanics",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/DPG26_On-line Learning Dynamics_Neural Scaling Laws_for_a_Perceptron_Classification_Problem_Thelge.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/4",
        "session_heading": "SOE 17.4: Vortrag",
        "title": "Power-Law Correlations in Language: Criticality vs. Hierarchical Generative Structure",
        "authors": [
          { "name": "Marcel K\u00fchn", "affil_ids": ["1,2"], "presenter": true },
          { "name": "Max Staats", "affil_ids": ["1,2"], "presenter": false },
          { "name": "Bernd Rosenow", "affil_ids": ["2"], "presenter": false }
        ],
        "affiliations": {
          "1": "ScaDS.AI Dresden/Leipzig, Germany",
          "2": "Institute for Theoretical Physics, University of Leipzig, 04103 Leipzig, Germany"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "10:15\u201310:30",
        "room": "G\u00d6R/0226",
        "abstract": "Natural language shows power-laws beyond Zipf: the mutual information between words as a function of separation \u2014 a two-point correlation \u2014 decays approximately as a power-law, a constraint for predictive language models. In autoregressive architectures like transformers, the softmax temperature of the output controls how sharply next-word probabilities concentrate, acting as a thermodynamic knob that might tune correlations. Since phase transitions are a well-known mechanism that generate such scale-free correlations, we ask whether the observed power-law mutual information requires tuning to a critical softmax temperature. Analyzing a Markov (bigram) model, we show that, in a large-system limit, power-law mutual information emerges only at a fine-tuned critical temperature, below correlations decay exponentially. Motivated by the fact that faithful language models must go beyond bigrams and that hierarchical generative processes introducing long range interactions are more representative, we analyze an autoregressive model that perfectly emulates a specific probabilistic context-free grammar. We demonstrate that simple versions of this model preserve power-law mutual information without temperature fine-tuning, and we discuss the generality of this result for variants of the model in which deviations from the grammatical rules may occur.",
        "keywords": "Autoregressive Language Models; Power-Laws; Phase Transitions; Natural Language Statistics; Hierarchical Structure",
        "pdf_link": null
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/5",
        "session_heading": "SOE 17.5: Vortrag",
        "title": "Dynamics of neural scaling laws in random feature regression",
        "authors": [
          { "name": "Jakob Kramp", "affil_ids": ["1,2"], "presenter": true },
          { "name": "Javed Lindner", "affil_ids": ["1,2"], "presenter": false },
          { "name": "Moritz Helias", "affil_ids": ["1,2"], "presenter": false }
        ],
        "affiliations": {
          "1": "Institute for Advanced Simulation (IAS-6), Computational and Systems Neuroscience, J\u00fclich Research Centre, J\u00fclich, Germany",
          "2": "Department of Physics, RWTH Aachen University, Aachen, Germany"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "10:30\u201310:45",
        "room": "G\u00d6R/0226",
        "abstract": "Training large neural networks reveals signs of universality that hold across architectures. This holds also for overparameterized networks which converge to effective descriptions in terms of Gaussian process regression. Those simplified models, already show one ingredient of universality in form of neural scaling laws. An important ingredient are power-law distributed principal component spectra of the training data.",
        "keywords": "Statistical Field Theory; Neural Network; Feature Regression; Bayesian Learning; Scaling Laws",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/dynamics_of_regression_dpg.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/6",
        "session_heading": "SOE 17.6: Hauptvortrag",
        "title": "Creativity in generative AI",
        "authors": [
          { "name": "Matthieu Wyart", "affil_ids": [], "presenter": true }
        ],
        "affiliations": {},
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "11:00\u201311:30",
        "room": "G\u00d6R/0226",
        "abstract": "Is AI creative? Generative AI such as chatGPT or diffusion models can create new texts or images from a finite training set of examples. I will argue that AI can achieve this magical by learning how compose observed low-level elements into a new whole. I will discuss the type of correlations the model can exploit to do so, how many data are needed for that, and how it relates to a hierarchical construction of latent variables. The analysis is based on the introduction of synthetic languages, and comparison with experiments performed on modern AI architectures trained on real text and images.",
        "keywords": null,
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/WYARTdresden26.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/7",
        "session_heading": "SOE 17.7: Vortrag",
        "title": "Understanding Generative Models via Interactions",
        "authors": [
          { "name": "Claudia Merger", "affil_ids": ["1,2,3"], "presenter": true },
          { "name": "Alexandre Rene", "affil_ids": ["2,4"], "presenter": false },
          { "name": "Kirsten Fischer", "affil_ids": ["2,3"], "presenter": false },
          { "name": "Peter Bouss", "affil_ids": ["2,3"], "presenter": false },
          { "name": "Sandra Nestler", "affil_ids": ["2,3"], "presenter": false },
          { "name": "David Dahmen", "affil_ids": ["2"], "presenter": false },
          { "name": "Carsten Honerkamp", "affil_ids": ["3"], "presenter": false },
          { "name": "Moritz Helias", "affil_ids": ["2,3"], "presenter": false },
          { "name": "Sebastian Goldt", "affil_ids": ["1"], "presenter": false }
        ],
        "affiliations": {
          "1": "SISSA, Trieste, Italy",
          "2": "J\u00fclich Research Centre, J\u00fclich, Germany",
          "3": "RWTH Aachen University, Aachen, Germany",
          "4": "University of Ottawa, Ottawa, Canada"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "11:30\u201311:45",
        "room": "G\u00d6R/0226",
        "abstract": "Generative models have become remarkably powerful at reproducing complex data distributions. They can infer the characteristic statistics of a system from comparatively small datasets and even generate new, realistic samples. Yet, our understanding of what these models learn remains limited: which statistics do they capture, and how accurately? To address the first question, we translate the statistics learned by generative models into a central concept of statistical physics: interactions between degrees of freedom that describe how pairs, triplets, and higher-order groups coact to produce the observed statistics of a system. Using invertible neural networks, we extract these interactions directly from trained models, providing a microscopic description of their learned data structure. To assess how accurately these interactions are learned, we use an analytic theory of diffusion models that predicts the precision with which pairwise interactions can be inferred from finite datasets, quantifying how generalization depends on sample size, data hierarchy, and regularization. Together, these results provide a framework grounded in statistical physics to interpret and predict the behavior of modern generative models.",
        "keywords": "Diffusion; Generalization; Interpretable AI; Interactions; Normalizing Flows",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/dpg-2026-understanding-merger.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/8",
        "session_heading": "SOE 17.8: Vortrag",
        "title": "From Kernels to Features: A Multi-Scale Adaptive Theory of Feature Learning",
        "authors": [
          { "name": "Kirsten Fischer", "affil_ids": ["1,6"], "presenter": true },
          { "name": "Javed Lindner", "affil_ids": ["1,2"], "presenter": false },
          { "name": "Noa Rubin", "affil_ids": ["5"], "presenter": false },
          { "name": "David Dahmen", "affil_ids": ["1"], "presenter": false },
          { "name": "Inbar Seroussi", "affil_ids": ["4"], "presenter": false },
          { "name": "Zohar Ringel", "affil_ids": ["5"], "presenter": false },
          { "name": "Michael Kr\u00e4mer", "affil_ids": ["3"], "presenter": false },
          { "name": "Moritz Helias", "affil_ids": ["1,2"], "presenter": false }
        ],
        "affiliations": {
          "1": "Institute for Advanced Simulation (IAS-6), Computational and Systems Neuroscience, J\u00fclich Research Centre, J\u00fclich, Germany",
          "2": "Department of Physics, RWTH Aachen University, Aachen, Germany",
          "3": "Institute for Theoretical Particle Physics and Cosmology, RWTH Aachen University, Aachen, Germany",
          "4": "Department of Applied Mathematics, School of Mathematical Sciences, Tel-Aviv University, Tel-Aviv, Israel",
          "5": "The Racah Institute of Physics, The Hebrew University of Jerusalem, Jerusalem, Israel",
          "6": "RWTH Aachen University, Aachen, Germany"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "11:45\u201312:00",
        "room": "G\u00d6R/0226",
        "abstract": "Feature learning in neural networks is crucial for their expressive power and inductive biases, motivating various theoretical approaches. Some approaches describe network behavior after training through a change in kernel scale from initialization, resulting in a generalization power comparable to a Gaussian process. Conversely, in other approaches training results in the adaptation of the kernel to the data, involving directional changes to the kernel. The relationship and respective strengths of these two views have so far remained unresolved. This work presents a theoretical framework of multi-scale adaptive feature learning bridging these two views. Using methods from statistical mechanics, we derive analytical expressions for network output statistics which are valid across scaling regimes and in the continuum between them.",
        "keywords": "Statistical Physics; Feature Learning; Neural Networks; Bayesian posterior; Kernel",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/DPG_Phy4AI_From_Kernels_to_Features_Rubin_Fischer_Lindner_Dahmen_Kraemer_Ringel_Helias_13_3_2026.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/9",
        "session_heading": "SOE 17.9: Vortrag",
        "title": "Statistical physics of deep learning: Optimal learning of a multi-layer perceptron near interpolation",
        "authors": [
          { "name": "Jean Barbier", "affil_ids": ["1"], "presenter": false },
          { "name": "Francesco Camilli", "affil_ids": ["1"], "presenter": false },
          { "name": "Minh-Toan Nguyen", "affil_ids": ["1"], "presenter": false },
          { "name": "Mauro Pastore", "affil_ids": ["1"], "presenter": false },
          { "name": "Rudy Skerk", "affil_ids": ["2"], "presenter": true }
        ],
        "affiliations": {
          "1": "The Abdus Salam International Centre for Theoretical Physics, Strada Costiera 11, 34151 Trieste, Italy",
          "2": "International School for Advanced Studies, Via Bonomea 265, 34136 Trieste, Italy"
        },
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "12:00\u201312:15",
        "room": "G\u00d6R/0226",
        "abstract": "We address a long-standing question in statistical physics by analysing the supervised learning of a multi-layer perceptron, beyond narrow models and kernel methods. Crucially, (i) the width scales with input dimension, making the model more prone to feature learning than ultra-wide networks and more expressive than narrow ones; and (ii) we work in the interpolation regime where trainable parameters and data are comparable, forcing task-specific adaptation.\nIn a matched teacher-student setting we establish the fundamental limits for learning random deep-network targets and identify the sufficient statistics that an optimally trained network acquires as data increases. A rich phenomenology appears with multiple learning transitions: with enough data optimal performance arises via model \u201cspecialisation\u201d, yet practical algorithms can be trapped in theory-predicted suboptimal solutions. Specialisation occurs inhomogeneously across layers, propagating from shallow towards deep ones, but also across neurons in each layer. The Bayesian-optimal analysis thus clarifies how depth, nonlinearity and finite (proportional) width shape feature learning, with implications beyond this idealised setting.",
        "keywords": "Spin-glass theory; Multi-layer percepron; Supervised learning; Statistical-to-computational gap; HCIZ integrals",
        "pdf_link": "https://fz-juelich.sciebo.de/public.php/dav/files/zJjJGtzCqSpokqt/Presentation_DeepLR_Dresden_Rudy_Skerk.pdf"
      },
      {
        "url": "https://www.dpg-verhandlungen.de/year/2026/conference/dresden/part/soe/session/17/contribution/10",
        "session_heading": "SOE 17.10: Vortrag",
        "title": "Phase Transitions as Rank Transitions: Connecting Data Complexity and Cascades of Phase Transitions in analytically tractable Neural Network Models",
        "authors": [
          { "name": "Bj\u00f6rn Ladewig", "affil_ids": [], "presenter": true },
          { "name": "Ibrahim Talha Ersoy", "affil_ids": [], "presenter": false },
          { "name": "Karoline Wiesner", "affil_ids": [], "presenter": false }
        ],
        "affiliations": {},
        "day_date": "Freitag, 13. M\u00e4rz 2026",
        "time": "12:15\u201312:30",
        "room": "G\u00d6R/0226",
        "abstract": "Tuning the L2-regularization strength in neural networks can result in a cascade of (zero-temperature) phase transitions between regimes of increasing accuracy. This phenomenology was previously numerically observed and linked to a basin structure of the error landscape formed by the underlying data [1]. At the level of analytically tractable models, we (i) establish the existence of cascades of transitions for those models, (ii) give meaning to the transitions in terms of the ordered onset of \u201clearned eigendirections\u201d of the underlying data distribution; and (iii) link the phase transitions and corresponding accuracy regimes to saddle points of the error landscape.",
        "keywords": "Deep Neural Network; Phase Transition; Regularization",
        "pdf_link": null
      }
    ]
  }
};
