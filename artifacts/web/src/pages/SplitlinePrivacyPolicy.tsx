import { useEffect } from "react";

export default function SplitlinePrivacyPolicy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Splitline Privacy Policy | Shotgun Ninjas Productions";
    return () => { document.title = previous; };
  }, []);
  return (<>
<style>{":root{color-scheme:light dark}*{box-sizing:border-box}body{margin:0;font:17px/1.6 system-ui,sans-serif;background:#f5f4ef;color:#1c251e}main{max-width:48rem;margin:auto;padding:2rem 1.4rem 4rem}header{border-bottom:3px solid #df5835;margin-bottom:2rem}h1{font-size:clamp(2rem,7vw,3.4rem);line-height:1.05;margin:.5rem 0}h2{font-size:1.3rem;margin:2rem 0 .3rem}p{margin:.4rem 0 1rem}a{color:#9b371c}small{letter-spacing:.05em;font-weight:650}@media(prefers-color-scheme:dark){body{background:#191e1a;color:#f1f2e9}a{color:#ff987a}}"}</style>
<main><header><small>SHOTGUN NINJAS PRODUCTIONS</small><h1>Splitline Privacy Policy</h1><p>Effective November 19, 2026</p></header>
<p>Shotgun Ninjas Productions publishes Splitline, an Android drag-strip timing app. You can use it without an account. This policy explains what the app records and when information leaves your phone.</p>
<h2>Location, motion and run history</h2><p>When you arm a live run, Splitline uses precise GPS location, speed, time, positioning quality and available phone motion sensors to measure a pass. It saves the route, splits, launch, timed finish and available stopping point with your vehicle profile in the app’s private storage. An armed capture can continue when the screen locks or you switch apps. End capture in Drag mode or from its ongoing notification. When enabled, coast-down tracking ends at a complete stop or after a maximum of three minutes following the timed finish. Demo mode uses simulated data.</p>
<h2>Optional engine telemetry</h2><p>GPS timing works with Bluetooth off. If you choose a previously paired Bluetooth Classic OBD-II adapter for a vehicle, Splitline uses Android’s Bluetooth connection permission to list paired devices and read available engine RPM, throttle position, coolant temperature and intake-air temperature during capture. The selected adapter name and Bluetooth address stay in app storage for that vehicle. Engine samples and derived summaries stay with the run. Turning the adapter setting off removes its saved association. Splitline does not request a VIN or change vehicle settings.</p>
<h2>Maps and network access</h2><p>The route grid works offline. If you turn on street maps or choose to load streets for a result, the app requests map images over HTTPS from OpenStreetMap. The provider receives the requested tile coordinates and zoom level, your IP address and an app/browser identifier. The tiles can reveal the area of a run, especially when zoomed in. Splitline does not send the saved timeslip, complete GPS sample list, vehicle profile or engine data to the map provider. The provider’s retention and handling are described in the <a href="https://osmfoundation.org/wiki/Privacy_Policy">OpenStreetMap Foundation Privacy Policy</a>.</p>
<h2>Exports, support and retention</h2><p>When you export a vehicle, Android lets you choose where to save its PDF or XML. The file can include coordinates, vehicle information, timing and engine readings. A cloud destination or recipient you choose may receive that file under its own privacy terms. Deleting a run or vehicle removes its saved data from Splitline. Clearing app storage or uninstalling removes local records. Delete exported copies separately at their destination.</p>
<p>Splitline has no advertising, analytics SDKs or developer-hosted run database. If you contact support, we receive the email address and content you send and retain the correspondence as needed to respond and resolve the request. You may email us to request deletion of support correspondence.</p>
<h2>Contact</h2><p>For privacy questions, contact Shotgun Ninjas Productions at <a href="mailto:john@shotgunninjas.com">john@shotgunninjas.com</a>. Updates to this policy will appear here with a revised effective date.</p>
</main>
</>);
}
