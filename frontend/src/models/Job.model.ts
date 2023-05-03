type Job = {
  job_id: number;
  organization_id: number;
  name: string;
  form_id: number;
  contract_id: number;
  station: string;
  require: string;
  wellcome: string;
  development_environment: number;
  price_from: number;
  price_to: number;
  duties: string;
  comment: string;
  image: string;
};

export default Job;
