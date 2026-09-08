declare global { interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown; } }
export const META_PIXEL_ID="2994094277589682";
const CAPI_DATASET_ID=META_PIXEL_ID;
const GRAPH_API_VERSION="v25.0";
const CAPI_ACCESS_TOKEN=((import.meta as unknown as {env?:Record<string,string|undefined>}).env?.VITE_META_CAPI_TOKEN) ?? "";
const LEAD_PARAMS={content_name:"Grupo VIP PROMO PERFUMES",content_category:"grupo_whatsapp"} as const;
function getCookie(name:string){if(typeof document==="undefined")return undefined;const match=document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));return match?decodeURIComponent(match[1]):undefined}
function getFbp(){return getCookie("_fbp")}
function getFbc(){return getCookie("_fbc")}
function uuid(){if(typeof crypto!=="undefined"&&typeof crypto.randomUUID==="function")return crypto.randomUUID();return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}
function sendConversionsApiEvent(eventId:string){if(!CAPI_ACCESS_TOKEN)return;const userData:Record<string,string>={client_user_agent:navigator.userAgent};const fbp=getFbp();if(fbp)userData.fbp=fbp;const fbc=getFbc();if(fbc)userData.fbc=fbc;const payload={data:[{event_name:"Lead",event_time:Math.floor(Date.now()/1000),event_id:eventId,event_source_url:window.location.href,action_source:"website",user_data:userData,custom_data:{...LEAD_PARAMS}}]};const url=`https://graph.facebook.com/${GRAPH_API_VERSION}/${CAPI_DATASET_ID}/events?access_token=${encodeURIComponent(CAPI_ACCESS_TOKEN)}`;const body=JSON.stringify(payload);try{if(typeof navigator.sendBeacon==="function"){const sent=navigator.sendBeacon(url,new Blob([body],{type:"text/plain"}));if(sent)return}void fetch(url,{method:"POST",body,mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain"}})}catch{}}
let lastLeadEventId:string|null=null;let lastLeadAt=0;const DEDUPE_WINDOW_MS=5*60*1000;
export function trackWhatsAppLead(){const now=Date.now();let eventId=lastLeadEventId;if(!eventId||now-lastLeadAt>DEDUPE_WINDOW_MS){eventId=uuid();lastLeadEventId=eventId}lastLeadAt=now;if(typeof window.fbq==="function")window.fbq("track","Lead",{...LEAD_PARAMS},{eventID:eventId});sendConversionsApiEvent(eventId)}
