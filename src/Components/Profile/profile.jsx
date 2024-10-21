import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { Button } from "../Button/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card/card"
import { Label } from '../Label/label'
import { Separator } from '../Separator/separator'
import { Switch } from '../Switch/switch'
import { TextArea } from '../TextArea/textArea';
import { PopCardContentWrapper, PopupOverlay, PopupContainer, PopupWrapper } from '../EventModal/EventModal.style'
import { setGlobalState } from '../../context/GlobalState'

export default function ProfilePage({ currentUser }) {
  return (
    <PopupWrapper>
      <PopupOverlay onClick={() => setGlobalState("showProfileModal", false)} />
      <PopupContainer>
        <PopCardContentWrapper>
          <div>
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar.Root className="h-24 w-24 rounded-full">
                    <Avatar.Image
                      className="h-full w-full rounded-full object-cover"
                      src={currentUser?.prefs?.googlePicture}
                      alt={currentUser?.name}
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium uppercase text-gray-800">
                      {currentUser?.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar.Root>
                </div>
                <CardTitle className="text-2xl font-bold">{currentUser?.name}</CardTitle>
                <CardDescription>{currentUser?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <TextArea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        className="resize-none" 
                        rows={4}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-gray-500">Receive email notifications</p>
                      </div>
                      <Switch id="notifications"/>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button onClick={() => setGlobalState("showProfileModal", false)} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </PopCardContentWrapper>
      </PopupContainer>
    </PopupWrapper>
  )
}