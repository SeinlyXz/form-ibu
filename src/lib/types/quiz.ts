export interface BiodataForm {
  nama: string;
  nomorHP: string;
  universitas: string;
  provinsi?: string;
}

export interface PerguruanTinggi {
  nama: string;
  provinsi: string;
}

export interface PerguruanTinggiResponse {
  data: PerguruanTinggi[];
  pagination: {
    total: number;
    halaman: number;
    perHalaman: number;
    totalHalaman: number;
  };
}

export interface QuizQuestion {
  no: number;
  pertanyaan: string;
  pilihan: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

export interface QuizAnswer {
  questionNo: number;
  answer: 'a' | 'b' | 'c' | 'd';
}

export interface QuizSubmission {
  biodata: BiodataForm;
  answers: QuizAnswer[];
  result: {
    type: 'inovator' | 'kreator' | 'pendidik' | 'pelestari';
    counts: {
      a: number;
      b: number;
      c: number;
      d: number;
    };
  };
  submittedAt: string;
}
