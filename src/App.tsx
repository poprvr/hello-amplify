import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsexports from "./aws-exports";

import AmplifyLiveness from "./components/AmplifyLiveness";

Amplify.configure(awsexports);

function App() {
  return (
    <ThemeProvider>
      <AmplifyLiveness />
    </ThemeProvider>
  );
}

export default App;
