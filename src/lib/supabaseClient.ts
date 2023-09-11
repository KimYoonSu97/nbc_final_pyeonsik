import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const serviceKey = process.env.REACT_APP_SERVICE_KEY as string;

const supabase = createClient(supabaseUrl, serviceKey);

export default supabase;
