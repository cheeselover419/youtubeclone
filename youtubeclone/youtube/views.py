from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import Channel


# Create your views here.

def home(request):
    return render(request, 'home.html')


def create_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')

    else:
        form = UserCreationForm()

    return render(request, 'create_user.html', {'form': form})

def custom_login(request):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return redirect('login')

    else:
        return render(request, 'login.html')


def custom_logout(request):
    logout(request)
    return redirect('home')


def channel(request, username, pk):
    user = User.objects.get(username=username)
    channel = Channel.objects.get(user=user, id=pk)

    if request.method == 'POST':
        action = request.POST['subscribe']

        if action == 'unsubscribe':
            channel.subscribers.remove(request.user)
        else:
            channel.subscribers.add(request.user)

        channel.save()

    return render(request, 'channel.html', {'channel': channel})


def create_channel(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            name = request.POST["channelName"]
            pfp = request.FILES.get('channel_pfp')

            if name and pfp:
                channel = Channel(user=request.user, name=name, profile_picture=pfp)
                channel.save()

                return redirect('home')

        else:
            return render(request, 'create_channel.html')
    else:
        return redirect('login')

    return render(request, 'create_channel.html')