import { BrowserRouter } from "react-router-dom";
import {
  AppRoutes,
  Authenticator,
  ChakraProvider,
  LayoutProvider,
  ModalProvider,
  ReactQueryProvider,
  Translator,
} from "./providers";

function App() {
  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <Translator>
          <LayoutProvider>
            <BrowserRouter>
              <ModalProvider />
              <Authenticator>
                <AppRoutes />
              </Authenticator>
            </BrowserRouter>
          </LayoutProvider>
        </Translator>
      </ChakraProvider>
    </ReactQueryProvider>
  );
}

export default App;
