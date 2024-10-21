import React, { useState, useEffect, useCallback } from "react"
import { Button } from "../Components/Button/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Components/Card/card"
import { Input } from "../Components/Input/input"
import { Label } from "../Components/Label/label"
import { Separator } from "../Components/Separator/separator"
import { ChevronRight } from "lucide-react"
import { useNavigate, useLocation } from 'react-router-dom';
import { OAuthProvider, account, ID } from "../appwrite"
import toast from 'react-hot-toast';
import useCurrentUser from "../hook/getCurrentUser"
import { handleAppwriteError } from "../errorHandler"

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://myeventbuddy.vercel.app' : 'http://localhost:3000';

export default function Login() {
  
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const navigateFrom = useCallback(() => {
    // Redirect the user to the page they were trying to access, or to dashboard if no specific page was saved
    const from = location.state?.from?.pathname || "/app/dashboard";
    navigate(from, { replace: true });
  }, [location.state?.from?.pathname, navigate])

  // useEffect(() => {
  //   if(currentUser) {
  //     navigateFrom()
  //   }
  // }, [currentUser, navigateFrom]);

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await account.create(ID.unique(), formData.email, formData.password, formData.name);
      toast.success("Account Created!");
      setIsSignUp(false);
    } catch (err) {
      handleAppwriteError(err);
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await account.createEmailPasswordSession(formData.email, formData.password);
      toast.success("Successfully logged in!");
      navigateFrom()
    } catch (err) {
      handleAppwriteError(err);
    }
  }

  const handleGoogleAuth = async () => {
    try {

      const successUrl = `${baseUrl}/app/dashboard`;
      const failureUrl = `${baseUrl}/login`;

      await account.createOAuth2Session(
        OAuthProvider.Google, // provider
        successUrl, // redirect here on success
        failureUrl, // redirect here on failure
        ['openid', 'profile', 'email'] // scopes
      );
    } catch (err) {
      handleAppwriteError(err);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <CardContent className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your fullname"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" size="lg">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                OR
              </span>
            </div>
            <Button type="button" variant="outline" className="w-full" size="lg" onClick={handleGoogleAuth}>
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13183_10121)">
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  />
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-sm text-gray-600"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}